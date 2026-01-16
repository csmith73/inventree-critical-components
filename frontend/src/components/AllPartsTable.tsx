// All Parts Table Component - flat table view without grouping

import React, { useMemo } from "react";
import { Box, Paper, Text } from "@mantine/core";
import type { InvenTreePluginContext } from "@inventreedb/ui";
import type { CriticalPart } from "../types";
import { filterLowStockParts, filterNeedsCheckParts, filterParts } from "../utils";
import { PartRow } from "./PartRow";
import { TableHeader } from "./TableHeader";

interface AllPartsTableProps {
  parts: CriticalPart[];
  context: InvenTreePluginContext;
  searchTerm: string;
  showLowStockOnly?: boolean;
  showNeedsCheckOnly?: boolean;
}

export function AllPartsTable({
  parts,
  context,
  searchTerm,
  showLowStockOnly = false,
  showNeedsCheckOnly = false,
}: AllPartsTableProps) {
  // Filter parts based on search, low stock filter, and needs check filter
  const filteredParts = useMemo(() => {
    let result = filterParts(parts, searchTerm);
    if (showLowStockOnly) {
      result = filterLowStockParts(result);
    }
    if (showNeedsCheckOnly) {
      result = filterNeedsCheckParts(result);
    }
    return result;
  }, [parts, searchTerm, showLowStockOnly, showNeedsCheckOnly]);

  if (filteredParts.length === 0) {
    return (
      <Paper withBorder p="xl">
        <Text c="dimmed" ta="center">
          {searchTerm
            ? `No parts found matching "${searchTerm}"`
            : showLowStockOnly
              ? "No low stock parts found"
              : showNeedsCheckOnly
                ? "No parts needing stock check found"
                : "No critical parts available"}
        </Text>
      </Paper>
    );
  }

  return (
    <Box>
      {/* Table */}
      <Paper withBorder style={{ overflow: "hidden" }}>
        <TableHeader showCategory={true} />
        <Box style={{ maxHeight: "60vh", overflowY: "auto" }}>
          {filteredParts.map((part) => (
            <PartRow
              key={`part-${part.id}`}
              part={part}
              context={context}
              showCategory={true}
              isExpandable={true}
            />
          ))}
        </Box>
      </Paper>

      {/* Results count */}
      {searchTerm && (
        <Text size="sm" c="dimmed" mt="sm">
          Showing {filteredParts.length} of {parts.length} parts
        </Text>
      )}
    </Box>
  );
}
