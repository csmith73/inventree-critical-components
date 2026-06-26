// Table Header Component - displays column headers for the parts table

import React from "react";
import { Box, Text, Tooltip } from "@mantine/core";

interface TableHeaderProps {
  showLocationQty?: boolean;
  showCategory?: boolean;
}

export function TableHeader({
  showLocationQty = false,
  showCategory = false,
}: TableHeaderProps) {
  // Determine grid columns based on view mode
  const gridColumns = showCategory
    ? "30px minmax(150px, 1.5fr) 100px minmax(120px, 1fr) minmax(100px, 1fr) 100px 110px 120px minmax(140px, 1fr)"
    : "30px minmax(180px, 2fr) 100px minmax(100px, 1fr) 100px 110px 120px minmax(140px, 1fr)";

  return (
    <Box
      px="md"
      py="xs"
      style={{
        display: "grid",
        gridTemplateColumns: gridColumns,
        gap: "12px",
        backgroundColor: "var(--mantine-color-gray-2)",
        borderBottom: "1px solid var(--mantine-color-gray-3)",
      }}
    >
      {/* Empty column for expand icon */}
      <Box />

      <Text size="xs" fw={600} c="dimmed" tt="uppercase">
        Part Name
      </Text>

      <Text size="xs" fw={600} c="dimmed" tt="uppercase">
        IPN
      </Text>

      {showCategory && (
        <Text size="xs" fw={600} c="dimmed" tt="uppercase">
          Category
        </Text>
      )}

      <Text size="xs" fw={600} c="dimmed" tt="uppercase">
        Description
      </Text>

      <Text size="xs" fw={600} c="dimmed" tt="uppercase">
        Qty Status
      </Text>

      <Text size="xs" fw={600} c="dimmed" tt="uppercase">
        Inv Status
      </Text>

      <Tooltip
        label="Lead time in days (most recent received purchase order)"
        position="left"
      >
        <Text size="xs" fw={600} c="dimmed" tt="uppercase">
          Lead Time
        </Text>
      </Tooltip>

      <Tooltip
        label="Current stock quantity / Minimum stock level"
        position="left"
      >
        <Text size="xs" fw={600} c="dimmed" tt="uppercase" ta="right">
          {showLocationQty ? "Qty at Location" : "Stock / Min"}
        </Text>
      </Tooltip>
    </Box>
  );
}
