// Excel export utility functions for Critical Components Plugin

import * as XLSX from "xlsx";
import type { CriticalPart } from "../types";
import { getStockStatus } from "./stockUtils";

/**
 * Export critical parts to an Excel file
 */
export function exportToExcel(parts: CriticalPart[], filename?: string): void {
  // Prepare data array for Excel
  const data = parts.map((part) => ({
    "Part Name": part.name,
    IPN: part.IPN || "",
    Category: part.category_path || part.category_name || "Uncategorized",
    Description: part.description || "",
    Status: getStockStatus(part).label,
    "Current Stock": part.total_stock,
    "Minimum Stock": part.minimum_stock || "",
  }));

  // Create workbook and worksheet
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(data);

  // Set column widths
  ws["!cols"] = [
    { wch: 30 }, // Part Name
    { wch: 15 }, // IPN
    { wch: 30 }, // Category
    { wch: 40 }, // Description
    { wch: 12 }, // Status
    { wch: 15 }, // Current Stock
    { wch: 15 }, // Minimum Stock
  ];

  XLSX.utils.book_append_sheet(wb, ws, "Critical Components");

  // Generate filename with date if not provided
  const date = new Date().toISOString().split("T")[0];
  const exportFilename = filename || `critical-components-${date}.xlsx`;

  // Download the file
  XLSX.writeFile(wb, exportFilename);
}

/**
 * Export critical parts with stock item details to Excel
 */
export function exportToExcelWithStockItems(
  parts: CriticalPart[],
  filename?: string
): void {
  // Create workbook
  const wb = XLSX.utils.book_new();

  // Parts summary sheet
  const partsData = parts.map((part) => ({
    "Part Name": part.name,
    IPN: part.IPN || "",
    Category: part.category_path || part.category_name || "Uncategorized",
    Description: part.description || "",
    Status: getStockStatus(part).label,
    "Current Stock": part.total_stock,
    "Minimum Stock": part.minimum_stock || "",
    "Stock Items Count": part.stock_items?.length || 0,
  }));

  const partsWs = XLSX.utils.json_to_sheet(partsData);
  partsWs["!cols"] = [
    { wch: 30 },
    { wch: 15 },
    { wch: 30 },
    { wch: 40 },
    { wch: 12 },
    { wch: 15 },
    { wch: 15 },
    { wch: 18 },
  ];
  XLSX.utils.book_append_sheet(wb, partsWs, "Parts Summary");

  // Stock items detail sheet
  const stockItemsData: Record<string, string | number>[] = [];
  for (const part of parts) {
    if (part.stock_items) {
      for (const item of part.stock_items) {
        stockItemsData.push({
          "Part Name": part.name,
          IPN: part.IPN || "",
          Location: item.location_path || item.location,
          Quantity: item.quantity,
          Serial: item.serial || "",
          Batch: item.batch || "",
          Status: item.status,
          "Last Updated": item.updated || "",
          "Stocktake Date": item.stocktake_date || "",
        });
      }
    }
  }

  if (stockItemsData.length > 0) {
    const stockWs = XLSX.utils.json_to_sheet(stockItemsData);
    stockWs["!cols"] = [
      { wch: 30 },
      { wch: 15 },
      { wch: 30 },
      { wch: 12 },
      { wch: 15 },
      { wch: 15 },
      { wch: 12 },
      { wch: 20 },
      { wch: 20 },
    ];
    XLSX.utils.book_append_sheet(wb, stockWs, "Stock Items");
  }

  // Generate filename with date if not provided
  const date = new Date().toISOString().split("T")[0];
  const exportFilename = filename || `critical-components-details-${date}.xlsx`;

  // Download the file
  XLSX.writeFile(wb, exportFilename);
}
