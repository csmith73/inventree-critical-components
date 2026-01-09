"""API views for the Critical Components plugin."""

from decimal import Decimal

from django.contrib.contenttypes.models import ContentType
from django.db.models import Sum

from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

import structlog

from common.models import Parameter, ParameterTemplate
from part.models import Part, PartCategory
from plugin import registry
from stock.models import StockItem

logger = structlog.get_logger('inventree')


def get_plugin():
    """Get the CriticalComponentsPlugin instance."""
    return registry.get_plugin('criticalcomponents')


def get_critical_parts():
    """Get all parts marked as critical components.
    
    Returns:
        QuerySet of Part objects that are marked as critical
    """
    plugin = get_plugin()
    param_name = plugin.get_parameter_name()
    true_values = plugin.get_true_values()
    
    # Find the parameter template
    try:
        template = ParameterTemplate.objects.get(name__iexact=param_name)
    except ParameterTemplate.DoesNotExist:
        logger.warning(f'Parameter template "{param_name}" not found')
        return Part.objects.none()
    
    # Get content type for Part model
    part_content_type = ContentType.objects.get_for_model(Part)
    
    # Find all parameters with true values
    parameters = Parameter.objects.filter(
        template=template,
        model_type=part_content_type,
        data__in=true_values
    )
    
    # Get part IDs
    part_ids = parameters.values_list('model_id', flat=True)
    
    # Fetch parts with prefetch for efficiency
    parts = Part.objects.filter(pk__in=part_ids).prefetch_related(
        'category',
        'stock_items',
        'stock_items__location'
    ).select_related('category')
    
    return parts


def get_stock_locations_summary(part):
    """Get stock grouped by location for a part.
    
    Args:
        part: Part instance
        
    Returns:
        List of dicts with location info and quantities
    """
    # Get in-stock items grouped by location
    stock_by_location = StockItem.objects.filter(
        part=part
    ).filter(
        StockItem.IN_STOCK_FILTER
    ).values(
        'location__id',
        'location__name',
        'location__pathstring'
    ).annotate(
        total_quantity=Sum('quantity')
    ).order_by('location__pathstring')
    
    locations = []
    for item in stock_by_location:
        locations.append({
            'location_id': item['location__id'],
            'location': item['location__name'] or 'No Location',
            'location_path': item['location__pathstring'] or '',
            'quantity': float(item['total_quantity'] or 0)
        })
    
    return locations


def get_stock_items_for_trackable(part):
    """Get individual stock items for a trackable part.
    
    Args:
        part: Part instance (should be trackable)
        
    Returns:
        List of dicts with stock item details
    """
    stock_items = StockItem.objects.filter(
        part=part
    ).filter(
        StockItem.IN_STOCK_FILTER
    ).select_related('location').order_by('serial', 'pk')
    
    items = []
    for item in stock_items:
        items.append({
            'id': item.pk,
            'serial': item.serial or '',
            'batch': item.batch or '',
            'quantity': float(item.quantity),
            'location': item.location.name if item.location else 'No Location',
            'location_id': item.location.pk if item.location else None,
            'location_path': item.location.pathstring if item.location else '',
            'status': str(item.status_label()),
            'updated': item.updated.isoformat() if item.updated else None,
            'url': f'/stock/item/{item.pk}/',
        })
    
    return items


def serialize_part(part, include_stock_items=True):
    """Serialize a part object for the API response.
    
    Args:
        part: Part instance
        include_stock_items: Whether to include individual stock items for trackable parts
        
    Returns:
        Dict with part data
    """
    plugin = get_plugin()
    show_low_stock = plugin.get_setting('SHOW_LOW_STOCK_WARNING', backup_value=True)
    
    # Get total stock
    total_stock = part.total_stock
    minimum_stock = float(part.minimum_stock) if part.minimum_stock else 0
    
    # Determine low stock status
    is_low_stock = False
    if show_low_stock and minimum_stock > 0:
        is_low_stock = float(total_stock) < minimum_stock
    
    # Get image URLs
    image_url = None
    thumbnail_url = None
    if part.image:
        image_url = part.image.url
        # InvenTree generates thumbnails, try to get it
        try:
            if hasattr(part, 'get_thumbnail_url'):
                thumbnail_url = part.get_thumbnail_url()
            else:
                thumbnail_url = image_url
        except Exception:
            thumbnail_url = image_url
    
    data = {
        'id': part.pk,
        'name': part.name,
        'IPN': part.IPN or '',
        'description': part.description or '',
        'image': image_url,
        'thumbnail': thumbnail_url or image_url,
        'total_stock': float(total_stock),
        'minimum_stock': minimum_stock,
        'is_low_stock': is_low_stock,
        'trackable': part.trackable,
        'url': f'/part/{part.pk}/',
        'stock_locations': get_stock_locations_summary(part),
    }
    
    # Add individual stock items for trackable parts
    if include_stock_items and part.trackable:
        data['stock_items'] = get_stock_items_for_trackable(part)
    
    return data


def build_category_hierarchy(parts):
    """Organize parts into a nested category structure.
    
    Args:
        parts: QuerySet or list of Part objects
        
    Returns:
        List of root category dicts with nested children and parts
    """
    # Map to track all categories we've seen
    category_map = {}  # {category_id: category_data}
    root_categories = []
    
    # Track which parts have been added to avoid duplicates
    added_parts = set()
    
    for part in parts:
        if part.pk in added_parts:
            continue
        added_parts.add(part.pk)
        
        if part.category:
            # Get the full ancestor chain for this category
            try:
                ancestors = list(part.category.get_ancestors(include_self=True))
            except Exception:
                ancestors = [part.category]
            
            # Build/update the category hierarchy
            prev_children = root_categories
            for i, ancestor in enumerate(ancestors):
                cat_id = ancestor.pk
                
                if cat_id not in category_map:
                    category_data = {
                        'id': cat_id,
                        'name': ancestor.name,
                        'pathstring': ancestor.pathstring or ancestor.name,
                        'icon': getattr(ancestor, 'icon', '') or '',
                        'parts': [],
                        'children': []
                    }
                    category_map[cat_id] = category_data
                    prev_children.append(category_data)
                
                prev_children = category_map[cat_id]['children']
            
            # Add part to its direct category
            category_map[part.category.pk]['parts'].append(serialize_part(part))
        else:
            # Part has no category - add to "Uncategorized"
            if 'uncategorized' not in category_map:
                uncategorized = {
                    'id': None,
                    'name': 'Uncategorized',
                    'pathstring': 'Uncategorized',
                    'icon': '',
                    'parts': [],
                    'children': []
                }
                category_map['uncategorized'] = uncategorized
                root_categories.append(uncategorized)
            
            category_map['uncategorized']['parts'].append(serialize_part(part))
    
    # Sort categories and parts
    def sort_category(cat):
        cat['children'] = sorted(cat['children'], key=lambda c: c['name'])
        cat['parts'] = sorted(cat['parts'], key=lambda p: p['name'])
        for child in cat['children']:
            sort_category(child)
    
    root_categories = sorted(root_categories, key=lambda c: c['name'])
    for cat in root_categories:
        sort_category(cat)
    
    return root_categories


def count_parts_in_categories(categories):
    """Count total parts and low stock parts in category hierarchy.
    
    Args:
        categories: List of category dicts from build_category_hierarchy
        
    Returns:
        Tuple of (total_parts, low_stock_count)
    """
    total = 0
    low_stock = 0
    
    def count_recursive(cat_list):
        nonlocal total, low_stock
        for cat in cat_list:
            for part in cat['parts']:
                total += 1
                if part.get('is_low_stock', False):
                    low_stock += 1
            count_recursive(cat['children'])
    
    count_recursive(categories)
    return total, low_stock


class CriticalComponentsListView(APIView):
    """API endpoint to get all critical components organized by category."""

    permission_classes = [IsAuthenticated]

    def get(self, request):
        """Get all critical components organized by category hierarchy."""
        # Check permission to view parts
        if not request.user.has_perm('part.view_part'):
            return Response(
                {'error': 'Permission denied'},
                status=status.HTTP_403_FORBIDDEN,
            )
        
        # Get critical parts
        parts = get_critical_parts()
        
        # Build category hierarchy
        categories = build_category_hierarchy(parts)
        
        # Count totals
        total_parts, low_stock_count = count_parts_in_categories(categories)
        
        return Response({
            'categories': categories,
            'total_parts': total_parts,
            'total_critical_low_stock': low_stock_count,
        })


class CriticalComponentsStatsView(APIView):
    """API endpoint to get quick statistics about critical components."""

    permission_classes = [IsAuthenticated]

    def get(self, request):
        """Get summary statistics for critical components."""
        # Check permission to view parts
        if not request.user.has_perm('part.view_part'):
            return Response(
                {'error': 'Permission denied'},
                status=status.HTTP_403_FORBIDDEN,
            )
        
        plugin = get_plugin()
        show_low_stock = plugin.get_setting('SHOW_LOW_STOCK_WARNING', backup_value=True)
        
        # Get critical parts
        parts = get_critical_parts()
        
        total_parts = 0
        low_stock_count = 0
        
        for part in parts:
            total_parts += 1
            
            if show_low_stock:
                minimum_stock = float(part.minimum_stock) if part.minimum_stock else 0
                if minimum_stock > 0 and float(part.total_stock) < minimum_stock:
                    low_stock_count += 1
        
        return Response({
            'total_parts': total_parts,
            'total_critical_low_stock': low_stock_count,
        })
