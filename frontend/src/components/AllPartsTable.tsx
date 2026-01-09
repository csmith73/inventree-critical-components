// All Parts Table Component - flat table view without grouping

import React, { useMemo } from "react";
import { ActionIcon, Box, Group, Paper, Text, Tooltip } from "@mantine/core";
import { IconFileSpreadsheet } from "@tabler/icons-react";
import type { InvenTreePluginContext } from "@inventreedb/ui";
import type { CriticalPart } from "../types";
import { exportToExcel, filterParts } from "../utils";
import { PartRow } from "./PartRow";
import { TableHeader } from "./TableHeader";

interface AllPartsTableProps {
  parts: CriticalPart[];
  context: InvenTreePluginContext;
  searchTerm: string;
}

export function AllPartsTable({
  parts,
  context,
  searchTerm,
}: AllPartsTableProps) {
  // Filter parts based on search
  const filteredParts = useMemo(() => {
    return filterParts(parts, searchTerm);
  }, [parts, searchTerm]);

  const handleExport = () => {
    exportToExcel(filteredParts);
  };

  if (filteredParts.length === 0) {
    return (
      <Paper withBorder p="xl">
        <Text c="dimmed" ta="center">
          {searchTerm
            ? `No parts found matching "${searchTerm}"`
            : "No critical parts available"}
        </Text>
      </Paper>
    );
  }

  return (
    <Box>
      {/* Export button row */}
      <Group justify="flex-end" mb="sm">
        <Tooltip label="Export to Excel">
          <ActionIcon
            variant="light"
            color="green"
            size="lg"
            onClick={handleExport}
          >
            <IconFileSpreadsheet size={20} />
          </ActionIcon>
        </Tooltip>
      </Group>

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
