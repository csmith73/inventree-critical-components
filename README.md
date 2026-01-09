# InvenTree Critical Components Plugin

A plugin for [InvenTree](https://inventree.org) that provides a dedicated view for tracking and displaying critical components organized by their parent category.

## Features

- **Dedicated Panel on Part Category Page**: Adds a "Critical Components" panel tab alongside Category Details, Parts, and Part Categories
- **Category Organization**: Parts are displayed organized by their parent category hierarchy
- **Part Images**: Displays part thumbnails/images for easy identification
- **Stock Locations**: Shows where stock is located for all parts
- **Low Stock Warnings**: Visual indicators when critical components are below minimum stock levels
- **Trackable Parts Support**: Expandable sections showing individual stock items with serial numbers for trackable parts

## Installation

### From Source (Development)

1. Clone or download this plugin to your InvenTree plugins directory:
   ```bash
   cd /path/to/inventree/plugins
   git clone https://github.com/your-org/inventree-critical-components.git
   ```

2. Install the plugin in development mode:
   ```bash
   cd inventree-critical-components
   pip install -e .
   ```

3. Restart InvenTree server:
   ```bash
   invoke server
   ```

### Via pip

```bash
pip install inventree-critical-components
```

## Configuration

### Step 1: Create the Parameter Template

1. Go to InvenTree Admin Panel → Part → Parameter Templates
2. Create a new parameter template:
   - **Name**: `CriticalComponent` (or your preferred name)
   - **Description**: `Mark parts as critical components`
   - **Units**: Leave blank
   - **Checkbox**: Disabled (we use string values)

### Step 2: Configure the Plugin

1. Go to InvenTree → Settings → Plugin Settings → Critical Components
2. Configure the settings:
   - **Parameter Name**: The name of your parameter template (default: `CriticalComponent`)
   - **True Values**: Comma-separated values that indicate a part is critical (default: `True,true,1,yes,Yes,TRUE`)
   - **Show Low Stock Warning**: Enable/disable low stock warnings (default: enabled)

### Step 3: Mark Parts as Critical

1. Go to any Part detail page
2. Navigate to the "Parameters" tab
3. Add the `CriticalComponent` parameter with value `True`
4. The part will now appear in the Critical Components view

## Usage

1. Navigate to **Part → Category** in InvenTree (or go to `/part/category/index/`)
2. Click on the "**Critical Components**" tab on the left panel (alongside Category Details, Parts, Part Categories)
3. View all critical parts organized by category hierarchy
4. For trackable parts, click "Show Stock Items" to expand individual stock items with serial numbers
5. Click on any part or stock item to navigate to its detail page

## API Endpoints

The plugin provides the following API endpoints:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/plugin/criticalcomponents/list/` | GET | Get all critical components organized by category |
| `/plugin/criticalcomponents/stats/` | GET | Get summary statistics (total parts, low stock count) |

### Example API Response

```json
{
  "categories": [
    {
      "id": 5,
      "name": "Capacitors",
      "pathstring": "Electronics/Capacitors",
      "parts": [
        {
          "id": 101,
          "name": "10uF Cap",
          "IPN": "CAP-10UF",
          "image": "/media/part_images/cap.jpg",
          "thumbnail": "/media/part_images/cap_thumb.jpg",
          "total_stock": 150,
          "minimum_stock": 50,
          "is_low_stock": false,
          "trackable": false,
          "url": "/part/101/",
          "stock_locations": [
            {"location": "Shelf A-1", "location_id": 10, "quantity": 50},
            {"location": "Shelf A-2", "location_id": 11, "quantity": 75}
          ]
        }
      ],
      "children": []
    }
  ],
  "total_parts": 15,
  "total_critical_low_stock": 3
}
```

## Plugin Settings

| Setting | Description | Default |
|---------|-------------|---------|
| `PARAMETER_NAME` | Name of the parameter template used to mark critical components | `CriticalComponent` |
| `TRUE_VALUES` | Comma-separated values that indicate a part is critical | `True,true,1,yes,Yes,TRUE` |
| `SHOW_LOW_STOCK_WARNING` | Display warning when stock is below minimum level | `True` |

## Requirements

- InvenTree >= 0.12.0
- Python >= 3.9

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions, please open an issue on GitHub.
