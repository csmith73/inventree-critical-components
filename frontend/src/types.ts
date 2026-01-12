// Types for Critical Components Plugin

// Stock item details
export interface StockItem {
  id: number;
  serial?: string;
  batch?: string;
  quantity: number;
  location: string;
  location_id: number | null;
  location_path: string;
  status: string;
  updated: string | null;
  stocktake_date: string | null;
  url: string;
  notes?: string;
}

// Stock location summary
export interface StockLocationSummary {
  location_id: number | null;
  location: string;
  location_path: string;
  quantity: number;
}

// Critical part data
export interface CriticalPart {
  id: number;
  name: string;
  IPN?: string;
  description?: string;
  url: string;
  thumbnail?: string;
  image?: string;
  total_stock: number;
  quantity_at_location?: number; // Only in location view
  minimum_stock: number;
  is_low_stock: boolean;
  trackable: boolean;
  stock_items?: StockItem[];
  stock_locations?: StockLocationSummary[];
  // For "all" view
  category_id?: number | null;
  category_name?: string;
  category_path?: string;
}

// Group node for category/location hierarchy
export interface GroupNode {
  id: number | null;
  name: string;
  pathstring?: string;
  icon?: string;
  parts: CriticalPart[];
  children: GroupNode[];
}

// API response data
export interface CriticalComponentsData {
  group_by: "category" | "location" | "all";
  categories?: GroupNode[];
  locations?: GroupNode[];
  parts?: CriticalPart[];
  total_parts: number;
  total_entries?: number;
  total_critical_low_stock: number;
  total_out_of_stock?: number;
}

// Group by type
export type GroupByType = "category" | "location" | "all";

// Stock status info
export interface StockStatusInfo {
  label: string;
  color: string;
  progressColor: string;
  progressValue: number;
}

// Stock tracking entry for history
export interface StockTrackingEntry {
  id: number;
  date: string | null;
  label: string;        // Action like "Stock counted", "Stock moved", etc.
  notes: string;
  user: string | null;
  details: string;      // Pre-formatted details string
}
