"""API views for the Critical Components plugin."""

from datetime import date
from decimal import Decimal

from django.db.models import Max, Sum

from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

import structlog

# Backward-compatible imports for Parameter and ParameterTemplate
# In InvenTree >= 1.2.0, these models were moved to common.models and use
# a generic ContentType-based relationship (model_type/model_id fields)
# In InvenTree < 1.2.0 (e.g., 1.1.7), they are in part.models with a direct
# FK to Part (part/part_id fields)
USES_GENERIC_PARAMETER_MODEL = False
try:
    from common.models import Parameter, ParameterTemplate
    # Check if this is the new generic model (has model_type field)
    USES_GENERIC_PARAMETER_MODEL = hasattr(Parameter, 'model_type') and hasattr(Parameter._meta.get_field('model_type'), 'related_model')
except ImportError:
    from part.models import PartParameter as Parameter, PartParameterTemplate as ParameterTemplate
    USES_GENERIC_PARAMETER_MODEL = False

# Only import ContentType if we're using the generic parameter model
if USES_GENERIC_PARAMETER_MODEL:
    from django.contrib.contenttypes.models import ContentType

from part.models import Part, PartCategory
from plugin import registry
from stock.models import StockItem, StockItemTracking, StockLocation

logger = structlog.get_logger('inventree')


def get_plugin():
    """Get the CriticalComponentsPlugin instance."""
    return registry.get_plugin('criticalcomponents')


def get_critical_parts():
    """Get all parts marked as critical components.
    
    Returns:
        QuerySet of Part objects that are marked as critical
    
    Note:
        This function supports both InvenTree < 1.2.0 (PartParameter model with direct
        FK to Part) and InvenTree >= 1.2.0 (generic Parameter model with ContentType).
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
    
    # Query parameters based on the model structure
    if USES_GENERIC_PARAMETER_MODEL:
        # InvenTree >= 1.2.0: Generic Parameter model with ContentType
        # Uses model_type (ContentType FK) and model_id fields
        part_content_type = ContentType.objects.get_for_model(Part)
        parameters = Parameter.objects.filter(
            template=template,
            model_type=part_content_type,
            data__in=true_values
        )
        part_ids = parameters.values_list('model_id', flat=True)
    else:
        # InvenTree < 1.2.0: PartParameter model with direct FK to Part
        # Uses part_id field directly
        parameters = Parameter.objects.filter(
            template=template,
            data__in=true_values
        )
        part_ids = parameters.values_list('part_id', flat=True)
    
    # Fetch parts with prefetch for efficiency
    parts = Part.objects.filter(pk__in=part_ids).prefetch_related(
        'category',
        'stock_items',
        'stock_items__location'
    ).select_related('category')
    
    return parts


def get_stock_qty_check_days_for_parts(part_ids):
    """Get StockQtyCheckDays parameter values for specified parts.
    
    This function supports both InvenTree < 1.2.0 (PartParameter model with direct
    FK to Part) and InvenTree >= 1.2.0 (generic Parameter model with ContentType).
    
    Args:
        part_ids: Collection of part IDs to look up
        
    Returns:
        Dict mapping part_id to StockQtyCheckDays value (int)
    """
    # Find the parameter template
    try:
        template = ParameterTemplate.objects.get(name__iexact='StockQtyCheckDays')
    except ParameterTemplate.DoesNotExist:
        return {}
    
    # Query parameters based on the model structure
    if USES_GENERIC_PARAMETER_MODEL:
        # InvenTree >= 1.2.0: Generic Parameter model with ContentType
        part_content_type = ContentType.objects.get_for_model(Part)
        parameters = Parameter.objects.filter(
            template=template,
            model_type=part_content_type,
            model_id__in=part_ids
        )
        result = {}
        for p in parameters:
            try:
                value = int(p.data)
                if value > 0:
                    result[p.model_id] = value
            except (ValueError, TypeError):
                pass
        return result
    else:
        # InvenTree < 1.2.0: PartParameter model with direct FK to Part
        parameters = Parameter.objects.filter(
            template=template,
            part_id__in=part_ids
        )
        result = {}
        for p in parameters:
            try:
                value = int(p.data)
                if value > 0:
                    result[p.part_id] = value
            except (ValueError, TypeError):
                pass
        return result


def get_leadtime_for_parts(part_ids):
    """Get 'leadtime' parameter values (in days) for specified parts.

    This function supports both InvenTree < 1.2.0 (PartParameter model with direct
    FK to Part) and InvenTree >= 1.2.0 (generic Parameter model with ContentType).

    Args:
        part_ids: Collection of part IDs to look up

    Returns:
        Dict mapping part_id to lead time value (int days)
    """
    # Find the parameter template
    try:
        template = ParameterTemplate.objects.get(name__iexact='leadtime')
    except ParameterTemplate.DoesNotExist:
        return {}

    # Query parameters based on the model structure
    if USES_GENERIC_PARAMETER_MODEL:
        # InvenTree >= 1.2.0: Generic Parameter model with ContentType
        part_content_type = ContentType.objects.get_for_model(Part)
        parameters = Parameter.objects.filter(
            template=template,
            model_type=part_content_type,
            model_id__in=part_ids
        )
        result = {}
        for p in parameters:
            try:
                result[p.model_id] = int(float(p.data))
            except (ValueError, TypeError):
                pass
        return result
    else:
        # InvenTree < 1.2.0: PartParameter model with direct FK to Part
        parameters = Parameter.objects.filter(
            template=template,
            part_id__in=part_ids
        )
        result = {}
        for p in parameters:
            try:
                result[p.part_id] = int(float(p.data))
            except (ValueError, TypeError):
                pass
        return result


def get_leadtimemanual_for_parts(part_ids):
    """Get 'leadtimemanual' boolean parameter values for specified parts.

    When true, the part's lead time is manually managed and is skipped by the
    automatic lead-time recalculation.

    Args:
        part_ids: Collection of part IDs to look up

    Returns:
        Dict mapping part_id to bool (only parts with a truthy value are included)
    """
    truthy = {'true', '1', 'yes', 'y', 't'}

    # Find the parameter template
    try:
        template = ParameterTemplate.objects.get(name__iexact='leadtimemanual')
    except ParameterTemplate.DoesNotExist:
        return {}

    # Query parameters based on the model structure
    if USES_GENERIC_PARAMETER_MODEL:
        part_content_type = ContentType.objects.get_for_model(Part)
        parameters = Parameter.objects.filter(
            template=template,
            model_type=part_content_type,
            model_id__in=part_ids
        )
        return {p.model_id: str(p.data).strip().lower() in truthy for p in parameters}
    else:
        parameters = Parameter.objects.filter(
            template=template,
            part_id__in=part_ids
        )
        return {p.part_id: str(p.data).strip().lower() in truthy for p in parameters}


def calculate_days_since_check(stocktake_date):
    """Calculate the number of days since the last stock check.
    
    Args:
        stocktake_date: Date of last stocktake (date object or None)
        
    Returns:
        Number of days since check, or None if no stocktake date
    """
    if not stocktake_date:
        return None
    
    today = date.today()
    delta = today - stocktake_date
    return delta.days


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


def get_stock_items_for_part(part, stock_qty_check_days=None):
    """Get individual stock items for any part.
    
    Args:
        part: Part instance
        stock_qty_check_days: Optional number of days for stock check frequency
        
    Returns:
        List of dicts with stock item details including location, dates, and quantity
    """
    stock_items = StockItem.objects.filter(
        part=part
    ).select_related('location').order_by('location__pathstring', 'serial', 'pk')
    
    items = []
    for item in stock_items:
        # Calculate days since last stock check
        days_since_check = calculate_days_since_check(item.stocktake_date)
        
        # Determine if stock needs to be checked
        needs_check = False
        if stock_qty_check_days is not None and days_since_check is not None:
            needs_check = days_since_check > stock_qty_check_days
        
        items.append({
            'id': item.pk,
            'serial': item.serial or '',
            'batch': item.batch or '',
            'quantity': float(item.quantity),
            'location': item.location.name if item.location else 'No Location',
            'location_id': item.location.pk if item.location else None,
            'location_path': item.location.pathstring if item.location else '',
            'status': str(item.status_label),
            'updated': item.updated.isoformat() if item.updated else None,
            'stocktake_date': item.stocktake_date.isoformat() if item.stocktake_date else None,
            'days_since_check': days_since_check,
            'needs_check': needs_check,
            'check_days_configured': stock_qty_check_days is not None,
            'url': f'/stock/item/{item.pk}/',
            'notes': item.notes or '',
        })
    
    return items


def get_stock_items_for_trackable(part):
    """Get individual stock items for a trackable part.
    
    Deprecated: Use get_stock_items_for_part instead.
    """
    return get_stock_items_for_part(part)


def serialize_part(part, include_stock_items=True, stock_qty_check_days=None, lead_time=None, lead_time_manual=False):
    """Serialize a part object for the API response.

    Args:
        part: Part instance
        include_stock_items: Whether to include individual stock items for trackable parts
        stock_qty_check_days: Optional number of days for stock check frequency
        lead_time: Optional lead time (in days) from the 'leadtime' part parameter
        lead_time_manual: Whether the lead time is manually managed ('leadtimemanual' parameter)

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
        'stock_qty_check_days': stock_qty_check_days,
        'lead_time': lead_time,
        'lead_time_manual': lead_time_manual,
    }

    # Add individual stock items for all parts (not just trackable)
    if include_stock_items:
        stock_items = get_stock_items_for_part(part, stock_qty_check_days)
        data['stock_items'] = stock_items
        # Check if any stock item needs checking
        data['has_needs_check'] = any(item.get('needs_check', False) for item in stock_items)
    else:
        data['has_needs_check'] = False
    
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
    
    # Convert to list to allow multiple iterations
    parts_list = list(parts)
    
    # Fetch StockQtyCheckDays, lead times and manual flags for all parts at once
    part_ids = [part.pk for part in parts_list]
    check_days_map = get_stock_qty_check_days_for_parts(part_ids)
    leadtime_map = get_leadtime_for_parts(part_ids)
    manual_map = get_leadtimemanual_for_parts(part_ids)

    for part in parts_list:
        if part.pk in added_parts:
            continue
        added_parts.add(part.pk)

        # Get check days and lead time for this part
        stock_qty_check_days = check_days_map.get(part.pk)
        lead_time = leadtime_map.get(part.pk)
        lead_time_manual = manual_map.get(part.pk, False)

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
            category_map[part.category.pk]['parts'].append(
                serialize_part(part, stock_qty_check_days=stock_qty_check_days, lead_time=lead_time, lead_time_manual=lead_time_manual)
            )
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
            
            category_map['uncategorized']['parts'].append(
                serialize_part(part, stock_qty_check_days=stock_qty_check_days, lead_time=lead_time, lead_time_manual=lead_time_manual)
            )
    
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
    """Count total parts, low stock parts, out of stock parts, and needs check in category hierarchy.
    
    Args:
        categories: List of category dicts from build_category_hierarchy
        
    Returns:
        Tuple of (total_parts, low_stock_count, out_of_stock_count, needs_check_count)
    """
    total = 0
    low_stock = 0
    out_of_stock = 0
    needs_check = 0
    
    def count_recursive(cat_list):
        nonlocal total, low_stock, out_of_stock, needs_check
        for cat in cat_list:
            for part in cat['parts']:
                total += 1
                stock = part.get('total_stock', 0)
                if stock <= 0:
                    out_of_stock += 1
                elif part.get('is_low_stock', False):
                    low_stock += 1
                if part.get('has_needs_check', False):
                    needs_check += 1
            count_recursive(cat['children'])
    
    count_recursive(categories)
    return total, low_stock, out_of_stock, needs_check


def serialize_part_for_location(part, location_id, quantity_at_location, lead_time=None, lead_time_manual=False):
    """Serialize a part object for the location view.

    Args:
        part: Part instance
        location_id: The specific location ID
        quantity_at_location: Stock quantity at this specific location
        
    Returns:
        Dict with part data including location-specific quantity
    """
    plugin = get_plugin()
    show_low_stock = plugin.get_setting('SHOW_LOW_STOCK_WARNING', backup_value=True)
    
    # Get total stock (for overall status)
    total_stock = part.total_stock
    minimum_stock = float(part.minimum_stock) if part.minimum_stock else 0
    
    # Determine low stock status based on total stock
    is_low_stock = False
    if show_low_stock and minimum_stock > 0:
        is_low_stock = float(total_stock) < minimum_stock
    
    # Get image URLs
    image_url = None
    thumbnail_url = None
    if part.image:
        image_url = part.image.url
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
        'quantity_at_location': float(quantity_at_location),
        'minimum_stock': minimum_stock,
        'is_low_stock': is_low_stock,
        'trackable': part.trackable,
        'url': f'/part/{part.pk}/',
        'lead_time': lead_time,
        'lead_time_manual': lead_time_manual,
    }

    return data


def build_location_hierarchy(parts):
    """Organize parts into a nested stock location structure.
    
    Args:
        parts: QuerySet or list of Part objects
        
    Returns:
        List of root location dicts with nested children and parts
    """
    # Map to track all locations we've seen
    location_map = {}  # {location_id: location_data}
    root_locations = []
    
    # Create a cache of parts for quick lookup
    parts_cache = {part.pk: part for part in parts}

    # Fetch lead times and manual flags for all parts at once
    leadtime_map = get_leadtime_for_parts(list(parts_cache.keys()))
    manual_map = get_leadtimemanual_for_parts(list(parts_cache.keys()))

    # Get all stock items for critical parts grouped by location
    stock_items = StockItem.objects.filter(
        part__in=parts_cache.keys()
    ).filter(
        StockItem.IN_STOCK_FILTER
    ).select_related('location', 'part').values(
        'part_id',
        'location_id',
        'location__name',
        'location__pathstring'
    ).annotate(
        total_quantity=Sum('quantity')
    )
    
    # Group stock items by location
    location_parts = {}  # {location_id: [(part_id, quantity), ...]}
    for item in stock_items:
        loc_id = item['location_id']
        if loc_id not in location_parts:
            location_parts[loc_id] = []
        location_parts[loc_id].append({
            'part_id': item['part_id'],
            'quantity': float(item['total_quantity'] or 0),
            'location_name': item['location__name'],
            'location_pathstring': item['location__pathstring']
        })
    
    # Process each location
    for loc_id, parts_data in location_parts.items():
        if loc_id is None:
            # Handle stock with no location
            if 'no_location' not in location_map:
                no_location = {
                    'id': None,
                    'name': 'No Location',
                    'pathstring': 'No Location',
                    'icon': '',
                    'parts': [],
                    'children': []
                }
                location_map['no_location'] = no_location
                root_locations.append(no_location)
            
            for part_data in parts_data:
                part = parts_cache.get(part_data['part_id'])
                if part:
                    location_map['no_location']['parts'].append(
                        serialize_part_for_location(part, None, part_data['quantity'], lead_time=leadtime_map.get(part.pk), lead_time_manual=manual_map.get(part.pk, False))
                    )
        else:
            # Get the location object to build hierarchy
            try:
                location = StockLocation.objects.get(pk=loc_id)
                ancestors = list(location.get_ancestors(include_self=True))
            except StockLocation.DoesNotExist:
                continue
            except Exception:
                ancestors = []
                continue
            
            # Build/update the location hierarchy
            prev_children = root_locations
            for ancestor in ancestors:
                anc_id = ancestor.pk
                
                if anc_id not in location_map:
                    location_data = {
                        'id': anc_id,
                        'name': ancestor.name,
                        'pathstring': ancestor.pathstring or ancestor.name,
                        'icon': getattr(ancestor, 'icon', '') or '',
                        'parts': [],
                        'children': []
                    }
                    location_map[anc_id] = location_data
                    prev_children.append(location_data)
                
                prev_children = location_map[anc_id]['children']
            
            # Add parts to this specific location
            for part_data in parts_data:
                part = parts_cache.get(part_data['part_id'])
                if part:
                    location_map[loc_id]['parts'].append(
                        serialize_part_for_location(part, loc_id, part_data['quantity'], lead_time=leadtime_map.get(part.pk), lead_time_manual=manual_map.get(part.pk, False))
                    )
    
    # Sort locations and parts
    def sort_location(loc):
        loc['children'] = sorted(loc['children'], key=lambda l: l['name'])
        loc['parts'] = sorted(loc['parts'], key=lambda p: p['name'])
        for child in loc['children']:
            sort_location(child)
    
    root_locations = sorted(root_locations, key=lambda l: l['name'])
    for loc in root_locations:
        sort_location(loc)
    
    return root_locations


def count_parts_in_locations(locations):
    """Count total part entries and low stock parts in location hierarchy.
    
    Note: A part may appear in multiple locations, so this counts entries, not unique parts.
    
    Args:
        locations: List of location dicts from build_location_hierarchy
        
    Returns:
        Tuple of (total_entries, low_stock_count, unique_part_ids)
    """
    total = 0
    low_stock = 0
    unique_parts = set()
    
    def count_recursive(loc_list):
        nonlocal total, low_stock
        for loc in loc_list:
            for part in loc['parts']:
                total += 1
                unique_parts.add(part['id'])
                if part.get('is_low_stock', False):
                    low_stock += 1
            count_recursive(loc['children'])
    
    count_recursive(locations)
    return total, low_stock, unique_parts


def serialize_part_flat(part, stock_qty_check_days=None, lead_time=None, lead_time_manual=False):
    """Serialize a part object for the flat 'all' view.

    Includes category information and stock items.

    Args:
        part: Part instance
        stock_qty_check_days: Optional number of days for stock check frequency
        lead_time: Optional lead time (in days) from the 'leadtime' part parameter
        lead_time_manual: Whether the lead time is manually managed ('leadtimemanual' parameter)

    Returns:
        Dict with part data including category info
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
        try:
            if hasattr(part, 'get_thumbnail_url'):
                thumbnail_url = part.get_thumbnail_url()
            else:
                thumbnail_url = image_url
        except Exception:
            thumbnail_url = image_url
    
    # Get category info
    category_name = ''
    category_path = ''
    category_id = None
    if part.category:
        category_name = part.category.name
        category_path = part.category.pathstring or part.category.name
        category_id = part.category.pk
    
    # Get stock items with check status
    stock_items = get_stock_items_for_part(part, stock_qty_check_days)
    has_needs_check = any(item.get('needs_check', False) for item in stock_items)
    
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
        'category_id': category_id,
        'category_name': category_name,
        'category_path': category_path,
        'stock_items': stock_items,
        'stock_qty_check_days': stock_qty_check_days,
        'has_needs_check': has_needs_check,
        'lead_time': lead_time,
        'lead_time_manual': lead_time_manual,
    }

    return data


def build_flat_parts_list(parts):
    """Build a flat list of all critical parts.
    
    Args:
        parts: QuerySet or list of Part objects
        
    Returns:
        List of serialized part dicts sorted by name
    """
    # Convert to list to allow multiple iterations
    parts_list_raw = list(parts)
    
    # Fetch StockQtyCheckDays, lead times and manual flags for all parts at once
    part_ids = [part.pk for part in parts_list_raw]
    check_days_map = get_stock_qty_check_days_for_parts(part_ids)
    leadtime_map = get_leadtime_for_parts(part_ids)
    manual_map = get_leadtimemanual_for_parts(part_ids)

    parts_list = []
    added_parts = set()

    for part in parts_list_raw:
        if part.pk in added_parts:
            continue
        added_parts.add(part.pk)
        stock_qty_check_days = check_days_map.get(part.pk)
        parts_list.append(serialize_part_flat(part, stock_qty_check_days=stock_qty_check_days, lead_time=leadtime_map.get(part.pk), lead_time_manual=manual_map.get(part.pk, False)))
    
    # Sort by name
    parts_list = sorted(parts_list, key=lambda p: p['name'].lower())
    
    return parts_list


class CriticalComponentsListView(APIView):
    """API endpoint to get all critical components organized by category, location, or flat list."""

    permission_classes = [IsAuthenticated]

    def get(self, request):
        """Get all critical components organized by category, location, or as flat list.
        
        Query Parameters:
            group_by: 'category' (default), 'location', or 'all' (flat list)
        """
        # Check permission to view parts
        if not request.user.has_perm('part.view_part'):
            return Response(
                {'error': 'Permission denied'},
                status=status.HTTP_403_FORBIDDEN,
            )
        
        # Get critical parts
        parts = get_critical_parts()
        
        # Check grouping preference
        group_by = request.query_params.get('group_by', 'category').lower()
        
        if group_by == 'all':
            # Build flat list of all parts
            parts_list = build_flat_parts_list(parts)
            
            # Count low stock, out of stock, and needs check
            low_stock_count = 0
            out_of_stock_count = 0
            needs_check_count = 0
            for p in parts_list:
                stock = p.get('total_stock', 0)
                if stock <= 0:
                    out_of_stock_count += 1
                elif p.get('is_low_stock', False):
                    low_stock_count += 1
                if p.get('has_needs_check', False):
                    needs_check_count += 1
            
            return Response({
                'group_by': 'all',
                'parts': parts_list,
                'total_parts': len(parts_list),
                'total_critical_low_stock': low_stock_count,
                'total_out_of_stock': out_of_stock_count,
                'total_needs_check': needs_check_count,
            })
        elif group_by == 'location':
            # Build location hierarchy
            locations = build_location_hierarchy(parts)
            
            # Count totals
            total_entries, low_stock_count, unique_parts = count_parts_in_locations(locations)
            
            return Response({
                'group_by': 'location',
                'locations': locations,
                'total_entries': total_entries,
                'total_parts': len(unique_parts),
                'total_critical_low_stock': low_stock_count,
            })
        else:
            # Build category hierarchy (default)
            categories = build_category_hierarchy(parts)
            
            # Count totals
            total_parts, low_stock_count, out_of_stock_count, needs_check_count = count_parts_in_categories(categories)
            
            return Response({
                'group_by': 'category',
                'categories': categories,
                'total_parts': total_parts,
                'total_critical_low_stock': low_stock_count,
                'total_out_of_stock': out_of_stock_count,
                'total_needs_check': needs_check_count,
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


def get_stock_tracking_for_item(stock_item_id):
    """Get stock tracking history for a specific stock item.
    
    Args:
        stock_item_id: The ID of the stock item
        
    Returns:
        List of dicts with tracking entry details
    """
    tracking_entries = StockItemTracking.objects.filter(
        item_id=stock_item_id
    ).select_related('user').order_by('-date')[:50]  # Limit to 50 most recent
    
    entries = []
    for entry in tracking_entries:
        # Extract details from deltas
        deltas = entry.deltas or {}
        
        # Build details string from deltas
        details_parts = []
        if 'quantity' in deltas:
            details_parts.append(f"Qty: {deltas['quantity']}")
        if 'added' in deltas:
            details_parts.append(f"Added: {deltas['added']}")
        if 'removed' in deltas:
            details_parts.append(f"Removed: {deltas['removed']}")
        if 'location_detail' in deltas:
            loc_detail = deltas['location_detail']
            loc_name = loc_detail.get('name', '') if isinstance(loc_detail, dict) else str(loc_detail)
            if loc_name:
                details_parts.append(f"Location: {loc_name}")
        
        entries.append({
            'id': entry.pk,
            'date': entry.date.isoformat() if entry.date else None,
            'label': entry.label() or '',
            'notes': entry.notes or '',
            'user': entry.user.username if entry.user else None,
            'details': ' | '.join(details_parts) if details_parts else '',
        })
    
    return entries


class StockTrackingView(APIView):
    """API endpoint to get stock tracking history for a stock item."""

    permission_classes = [IsAuthenticated]

    def get(self, request, stock_id):
        """Get tracking history for a specific stock item.
        
        Args:
            stock_id: The ID of the stock item
        """
        # Check permission to view stock
        if not request.user.has_perm('stock.view_stockitem'):
            return Response(
                {'error': 'Permission denied'},
                status=status.HTTP_403_FORBIDDEN,
            )
        
        # Verify the stock item exists
        try:
            StockItem.objects.get(pk=stock_id)
        except StockItem.DoesNotExist:
            return Response(
                {'error': 'Stock item not found'},
                status=status.HTTP_404_NOT_FOUND,
            )
        
        entries = get_stock_tracking_for_item(stock_id)

        return Response({
            'stock_id': stock_id,
            'entries': entries,
        })


def compute_lead_time_for_part(part):
    """Compute lead time (in days) for a part from its purchase order history.

    Lead time is defined as the number of days between the order date and the
    received date of the most recent purchase order that has been received:

    - Order date  = PurchaseOrder.issue_date (when the order was placed)
    - Received date = the most recent actual stock receipt against that order
      (StockItemTracking entry of type RECEIVED_AGAINST_PURCHASE_ORDER)

    Among all purchase orders that have received stock for this part (and have a
    non-null issue_date), the one with the latest issue_date is selected.

    Args:
        part: Part instance

    Returns:
        Integer number of days, or None if there is insufficient data.
    """
    from order.models import PurchaseOrder, PurchaseOrderLineItem
    from stock.status_codes import StockHistoryCode

    # Supplier parts for this part (purchase orders reference parts via supplier parts)
    supplier_part_ids = list(part.supplier_parts.values_list('pk', flat=True))
    if not supplier_part_ids:
        return None

    # Purchase orders that have a line item for one of this part's supplier parts
    po_ids = list(
        PurchaseOrderLineItem.objects.filter(part_id__in=supplier_part_ids)
        .values_list('order_id', flat=True)
        .distinct()
    )
    if not po_ids:
        return None

    # Most recent actual receipt date per purchase order for this part
    receipts = (
        StockItemTracking.objects.filter(
            item__purchase_order_id__in=po_ids,
            item__part=part,
            tracking_type=StockHistoryCode.RECEIVED_AGAINST_PURCHASE_ORDER,
        )
        .values('item__purchase_order_id')
        .annotate(last_receipt=Max('date'))
    )
    receipt_map = {
        r['item__purchase_order_id']: r['last_receipt']
        for r in receipts
        if r['last_receipt'] is not None
    }
    if not receipt_map:
        return None

    # Of the received orders that have an issue date, pick the most recently placed one
    po = (
        PurchaseOrder.objects.filter(pk__in=receipt_map.keys(), issue_date__isnull=False)
        .order_by('-issue_date')
        .first()
    )
    if not po:
        return None

    receipt_dt = receipt_map.get(po.pk)
    if not receipt_dt:
        return None

    days = (receipt_dt.date() - po.issue_date).days
    if days < 0:
        return None

    return days


def get_or_create_leadtime_template():
    """Get (case-insensitively) or create the 'leadtime' ParameterTemplate."""
    template = ParameterTemplate.objects.filter(name__iexact='leadtime').first()
    if template is None:
        template = ParameterTemplate.objects.create(
            name='leadtime',
            description='Lead time in days (most recent received purchase order)',
        )
    return template


def get_or_create_leadtimemanual_template():
    """Get (case-insensitively) or create the 'leadtimemanual' ParameterTemplate.

    Created as a checkbox template so it renders as a checkbox on the part page.
    """
    template = ParameterTemplate.objects.filter(name__iexact='leadtimemanual').first()
    if template is None:
        kwargs = {
            'name': 'leadtimemanual',
            'description': 'If set, the lead time is managed manually and skipped by auto-recalculation',
        }
        # The generic (>= 1.2.0) ParameterTemplate supports a 'checkbox' flag
        if any(f.name == 'checkbox' for f in ParameterTemplate._meta.get_fields()):
            kwargs['checkbox'] = True
        template = ParameterTemplate.objects.create(**kwargs)
    return template


def set_part_parameter(template, part, value):
    """Create or update a parameter value for a part (version-compatible)."""
    if USES_GENERIC_PARAMETER_MODEL:
        Parameter.objects.update_or_create(
            template=template,
            model_type=ContentType.objects.get_for_model(Part),
            model_id=part.pk,
            defaults={'data': str(value)},
        )
    else:
        Parameter.objects.update_or_create(
            template=template,
            part=part,
            defaults={'data': str(value)},
        )


def delete_part_parameter(template, part):
    """Delete a parameter value for a part, if it exists (version-compatible)."""
    if USES_GENERIC_PARAMETER_MODEL:
        Parameter.objects.filter(
            template=template,
            model_type=ContentType.objects.get_for_model(Part),
            model_id=part.pk,
        ).delete()
    else:
        Parameter.objects.filter(template=template, part=part).delete()


class RecalculateLeadTimesView(APIView):
    """API endpoint to (re)calculate the 'leadtime' parameter for all critical parts."""

    permission_classes = [IsAuthenticated]

    def post(self, request):
        """Recalculate and store lead times for every critical part."""
        # Writing part parameters requires change permission on parts
        if not request.user.has_perm('part.change_part'):
            return Response(
                {'error': 'Permission denied'},
                status=status.HTTP_403_FORBIDDEN,
            )

        template = get_or_create_leadtime_template()

        critical_parts = list(get_critical_parts())
        # Parts flagged as manually-managed are protected from recalculation
        manual_map = get_leadtimemanual_for_parts([p.pk for p in critical_parts])

        updated = 0
        skipped = 0
        skipped_manual = 0

        for part in critical_parts:
            if manual_map.get(part.pk, False):
                skipped_manual += 1
                continue

            days = compute_lead_time_for_part(part)

            if days is None:
                skipped += 1
                continue

            set_part_parameter(template, part, days)
            updated += 1

        return Response({
            'updated': updated,
            'skipped': skipped,
            'skipped_manual': skipped_manual,
        })


class SetLeadTimeView(APIView):
    """API endpoint to manually set the lead time (and manual flag) for a part."""

    permission_classes = [IsAuthenticated]

    def post(self, request):
        """Set the 'leadtime' value and 'leadtimemanual' flag for a single part.

        Body:
            part_id: int (required)
            lead_time: int | null  - days; null clears the value when manual is false
            manual: bool            - whether to protect the value from auto-recalc
        """
        if not request.user.has_perm('part.change_part'):
            return Response(
                {'error': 'Permission denied'},
                status=status.HTTP_403_FORBIDDEN,
            )

        part_id = request.data.get('part_id')
        manual = bool(request.data.get('manual', False))
        lead_time = request.data.get('lead_time', None)

        # Validate part
        try:
            part = Part.objects.get(pk=part_id)
        except (Part.DoesNotExist, ValueError, TypeError):
            return Response(
                {'error': 'Part not found'},
                status=status.HTTP_404_NOT_FOUND,
            )

        # Validate lead_time (optional, non-negative integer)
        if lead_time in (None, ''):
            lead_time = None
        else:
            try:
                lead_time = int(lead_time)
            except (ValueError, TypeError):
                return Response(
                    {'error': 'lead_time must be an integer number of days'},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            if lead_time < 0:
                return Response(
                    {'error': 'lead_time cannot be negative'},
                    status=status.HTTP_400_BAD_REQUEST,
                )

        leadtime_template = get_or_create_leadtime_template()
        manual_template = get_or_create_leadtimemanual_template()

        # Persist the manual flag
        set_part_parameter(manual_template, part, 'true' if manual else 'false')

        # Persist (or clear) the lead time value
        if lead_time is not None:
            set_part_parameter(leadtime_template, part, lead_time)
        elif not manual:
            # No value and not manual -> revert to auto (clear stored value)
            delete_part_parameter(leadtime_template, part)

        return Response({
            'part_id': part.pk,
            'lead_time': lead_time,
            'lead_time_manual': manual,
        })
