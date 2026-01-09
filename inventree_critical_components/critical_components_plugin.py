"""Critical Components Plugin for InvenTree.

This plugin adds a dedicated view for tracking and displaying critical components.
"""

from django.urls import path
from django.utils.translation import gettext_lazy as _

from plugin import InvenTreePlugin
from plugin.mixins import (
    SettingsMixin,
    UrlsMixin,
    UserInterfaceMixin,
)


class CriticalComponentsPlugin(
    SettingsMixin,
    UrlsMixin,
    UserInterfaceMixin,
    InvenTreePlugin,
):
    """Plugin that provides a dedicated view for critical components."""

    # Plugin metadata
    NAME = 'CriticalComponentsPlugin'
    SLUG = 'criticalcomponents'
    TITLE = 'Critical Components'
    DESCRIPTION = 'Track and display critical components organized by category'
    VERSION = '1.0.0'
    AUTHOR = 'InvenTree Critical Components Plugin'
    
    # Minimum InvenTree version required
    MIN_VERSION = '0.12.0'

    # Plugin settings - using plain strings to avoid lazy translation proxy issues
    SETTINGS = {
        'PARAMETER_NAME': {
            'name': 'Parameter Name',
            'description': 'Name of the parameter template used to mark critical components',
            'default': 'CriticalComponent',
        },
        'TRUE_VALUES': {
            'name': 'True Values',
            'description': 'Comma-separated values that indicate a part is critical (e.g., True,true,1,yes)',
            'default': 'True,true,1,yes,Yes,TRUE',
        },
        'SHOW_LOW_STOCK_WARNING': {
            'name': 'Show Low Stock Warning',
            'description': 'Display warning when stock is below minimum level',
            'default': True,
        },
    }

    def setup_urls(self):
        """Set up URL patterns for the plugin API."""
        from . import api
        
        return [
            path(
                'list/',
                api.CriticalComponentsListView.as_view(),
                name='critical-components-list',
            ),
            path(
                'stats/',
                api.CriticalComponentsStatsView.as_view(),
                name='critical-components-stats',
            ),
        ]

    def get_ui_panels(self, request, context, **kwargs):
        """Return custom UI panels for the Part Category page."""
        panels = []
        target_model = context.get('target_model', None)
        
        # Add panel to Part Category page (shows on /part/category/index/ and /part/category/:id/)
        if target_model == 'partcategory':
            panels.append({
                'key': 'critical-components-panel',
                'title': _('Critical Components'),
                'description': _('View all critical components organized by category'),
                'icon': 'ti:alert-triangle:outline',
                'source': self.plugin_static_file('Panel.js:renderPanel'),
                'context': {
                    'settings': self.get_settings_dict(),
                }
            })
        
        return panels

    def get_true_values(self):
        """Get list of values that indicate a part is critical."""
        values_str = self.get_setting('TRUE_VALUES', backup_value='True,true,1,yes,Yes,TRUE')
        return [v.strip() for v in str(values_str).split(',') if v.strip()]

    def get_parameter_name(self):
        """Get the parameter template name used to mark critical components."""
        return str(self.get_setting('PARAMETER_NAME', backup_value='CriticalComponent'))
