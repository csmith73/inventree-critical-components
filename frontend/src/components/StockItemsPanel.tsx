// Stock Items Panel Component - displays expanded stock item details

import React, { useMemo } from "react";
import { Anchor, Box, Table, Text } from "@mantine/core";
import type { InvenTreePluginContext } from "@inventreedb/ui";
import type { StockItem } from "../types";
import { formatDate } from "../utils";

interface StockItemsPanelProps {
  stockItems: StockItem[];
  context: InvenTreePluginContext;
}

export function StockItemsPanel({ stockItems, context }: StockItemsPanelProps) {
  // Determine if we should show serial and notes columns based on data
  const { hasSerial, hasNotes } = useMemo(() => {
    let hasSerial = false;
    let hasNotes = false;
    for (const item of stockItems) {
      if (item.serial && item.serial.trim() !== "") {
        hasSerial = true;
      }
      if (item.notes && item.notes.trim() !== "") {
        hasNotes = true;
      }
      if (hasSerial && hasNotes) break;
    }
    return { hasSerial, hasNotes };
  }, [stockItems]);

  if (!stockItems || stockItems.length === 0) {
    return (
      <Box px="md" py="sm" bg="gray.0">
        <Text size="sm" c="dimmed" fs="italic">
          No stock items available
        </Text>
      </Box>
    );
  }

  return (
    <Box
      px="md"
      py="sm"
      bg="gray.0"
      style={{ borderTop: "1px solid var(--mantine-color-gray-3)" }}
    >
      <Table striped highlightOnHover withTableBorder={false}>
        <Table.Thead>
          <Table.Tr>
            {hasSerial && <Table.Th>Serial</Table.Th>}
            <Table.Th>Location</Table.Th>
            <Table.Th style={{ textAlign: "right" }}>Quantity</Table.Th>
            <Table.Th>Last Stock Qty Edit Date</Table.Th>
            <Table.Th>Status</Table.Th>
            {hasNotes && <Table.Th>Notes</Table.Th>}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {stockItems.map((item) => (
            <Table.Tr key={item.id}>
              {hasSerial && (
                <Table.Td>
                  <Anchor
                    size="sm"
                    fw={500}
                    onClick={() => {
                      context.navigate(item.url);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    {item.serial || "-"}
                  </Anchor>
                </Table.Td>
              )}
              <Table.Td>
                <Anchor
                  size="sm"
                  onClick={() => {
                    if (item.location_id) {
                      context.navigate(`/stock/location/${item.location_id}/`);
                    }
                  }}
                  style={{ cursor: item.location_id ? "pointer" : "default" }}
                >
                  {item.location_path || item.location}
                </Anchor>
              </Table.Td>
              <Table.Td style={{ textAlign: "right" }}>
                <Text size="sm" fw={500}>
                  {item.quantity}
                </Text>
              </Table.Td>
              <Table.Td>
                <Text size="sm" c="dimmed">
                  {formatDate(item.stocktake_date)}
                </Text>
              </Table.Td>
              <Table.Td>
                <Text size="sm" c="dimmed">
                  {item.status}
                </Text>
              </Table.Td>
              {hasNotes && (
                <Table.Td>
                  <Text size="sm" c="dimmed" lineClamp={2}>
                    {item.notes || "-"}
                  </Text>
                </Table.Td>
              )}
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Box>
  );
}
