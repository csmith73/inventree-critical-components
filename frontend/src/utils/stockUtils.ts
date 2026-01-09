// Stock utility functions for Critical Components Plugin

import type { CriticalPart, GroupNode, StockStatusInfo } from "../types";

/**
 * Get stock status information for a part
 */
export function getStockStatus(part: CriticalPart): StockStatusInfo {
  const stock = part.total_stock ?? 0;
  const minStock = part.minimum_stock ?? 0;

  if (stock <= 0) {
    return {
      label: "Out of Stock",
      color: "red",
      progressColor: "red",
      progressValue: 0,
    };
  } else if (part.is_low_stock || (minStock > 0 && stock < minStock)) {
    const percentage = minStock > 0 ? Math.min((stock / minStock) * 100, 100) : 50;
    return {
      label: "Low Stock",
      color: "orange",
      progressColor: "orange",
      progressValue: percentage,
    };
  } else {
    const percentage = minStock > 0 ? Math.min((stock / minStock) * 100, 100) : 100;
    return {
      label: "In Stock",
      color: "green",
      progressColor: "teal",
      progressValue: percentage,
    };
  }
}

/**
 * Format stock display string
 * Shows "stock" or "stock / min (min)" format
 */
export function formatStockDisplay(
  part: CriticalPart,
  showLocationQty = false
): { stock: number; min: number | null; showMin: boolean } {
  if (showLocationQty && part.quantity_at_location !== undefined) {
    return {
      stock: part.quantity_at_location,
      min: null,
      showMin: false,
    };
  }

  const stock = part.total_stock ?? 0;
  const min = part.minimum_stock ?? 0;

  return {
    stock,
    min: min > 0 ? min : null,
    showMin: min > 0,
  };
}

/**
 * Format date for display
 */
export function formatDate(dateString: string | null): string {
  if (!dateString) return "-";
  
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "-";
  }
}

/**
 * Count parts in a group (including nested children)
 */
export function countPartsInGroup(group: GroupNode): number {
  let count = group.parts ? group.parts.length : 0;
  if (group.children) {
    for (const child of group.children) {
      count += countPartsInGroup(child);
    }
  }
  return count;
}

/**
 * Get all group IDs for expand/collapse all functionality
 */
export function getAllGroupIds(groups: GroupNode[], prefix: string): string[] {
  const ids: string[] = [];

  function collectIds(nodes: GroupNode[], level: number) {
    for (const node of nodes) {
      ids.push(`${prefix}-${node.id ?? "none"}-${level}`);
      if (node.children && node.children.length > 0) {
        collectIds(node.children, level + 1);
      }
    }
  }

  collectIds(groups, 0);
  return ids;
}

/**
 * Filter groups based on search term
 */
export function filterGroups(groups: GroupNode[], searchTerm: string): GroupNode[] {
  if (!searchTerm) return groups;

  const lowerSearch = searchTerm.toLowerCase();

  function filterGroup(group: GroupNode): GroupNode | null {
    // Filter parts that match the search
    const matchingParts = group.parts.filter(
      (part) =>
        part.name.toLowerCase().includes(lowerSearch) ||
        part.IPN?.toLowerCase().includes(lowerSearch) ||
        part.description?.toLowerCase().includes(lowerSearch)
    );

    // Recursively filter children
    const filteredChildren = group.children
      .map(filterGroup)
      .filter((child): child is GroupNode => child !== null);

    // Return group if it has matching parts or filtered children
    if (matchingParts.length > 0 || filteredChildren.length > 0) {
      return {
        ...group,
        parts: matchingParts,
        children: filteredChildren,
      };
    }

    return null;
  }

  return groups
    .map(filterGroup)
    .filter((group): group is GroupNode => group !== null);
}

/**
 * Filter flat parts list based on search term
 */
export function filterParts(parts: CriticalPart[], searchTerm: string): CriticalPart[] {
  if (!searchTerm) return parts;

  const lowerSearch = searchTerm.toLowerCase();

  return parts.filter(
    (part) =>
      part.name.toLowerCase().includes(lowerSearch) ||
      part.IPN?.toLowerCase().includes(lowerSearch) ||
      part.description?.toLowerCase().includes(lowerSearch) ||
      part.category_name?.toLowerCase().includes(lowerSearch) ||
      part.category_path?.toLowerCase().includes(lowerSearch)
  );
}

/**
 * Filter flat parts list to only show low stock parts
 */
export function filterLowStockParts(parts: CriticalPart[]): CriticalPart[] {
  return parts.filter((part) => part.is_low_stock);
}

/**
 * Filter groups to only show low stock parts, removing empty groups
 */
export function filterGroupsLowStockOnly(groups: GroupNode[]): GroupNode[] {
  function filterGroup(group: GroupNode): GroupNode | null {
    // Filter parts that are low stock
    const lowStockParts = group.parts.filter((part) => part.is_low_stock);

    // Recursively filter children
    const filteredChildren = group.children
      .map(filterGroup)
      .filter((child): child is GroupNode => child !== null);

    // Return group if it has low stock parts or filtered children
    if (lowStockParts.length > 0 || filteredChildren.length > 0) {
      return {
        ...group,
        parts: lowStockParts,
        children: filteredChildren,
      };
    }

    return null;
  }

  return groups
    .map(filterGroup)
    .filter((group): group is GroupNode => group !== null);
}
