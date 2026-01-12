// Stock Tracking Panel Component - displays tracking history for a stock item

import React from "react";
import { Box, Table, Text } from "@mantine/core";
import type { StockTrackingEntry } from "../types";
import { formatDate } from "../utils";

interface StockTrackingPanelProps {
  entries: StockTrackingEntry[];
  loading?: boolean;
}

export function StockTrackingPanel({ entries, loading }: StockTrackingPanelProps) {
  if (loading) {
    return (
      <Box px="lg" py="sm" bg="gray.1">
        <Text size="sm" c="dimmed" fs="italic">
          Loading tracking history...
        </Text>
      </Box>
    );
  }

  if (!entries || entries.length === 0) {
    return (
      <Box px="lg" py="sm" bg="gray.1">
        <Text size="sm" c="dimmed" fs="italic">
          No tracking history available
        </Text>
      </Box>
    );
  }

  return (
    <Box
      px="lg"
      py="sm"
      bg="gray.1"
      style={{ borderLeft: "3px solid var(--mantine-color-blue-4)" }}
    >
      <Text size="xs" fw={600} c="dimmed" mb="xs">
        Stock Tracking History
      </Text>
      <Table striped highlightOnHover withTableBorder={false}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Date</Table.Th>
            <Table.Th>Action</Table.Th>
            <Table.Th>Details</Table.Th>
            <Table.Th>User</Table.Th>
            <Table.Th>Notes</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {entries.map((entry) => (
            <Table.Tr key={entry.id}>
              <Table.Td>
                <Text size="xs" c="dimmed">
                  {formatDate(entry.date)}
                </Text>
              </Table.Td>
              <Table.Td>
                <Text size="xs" fw={500}>
                  {entry.label || "-"}
                </Text>
              </Table.Td>
              <Table.Td>
                <Text size="xs" c="dimmed">
                  {entry.details || "-"}
                </Text>
              </Table.Td>
              <Table.Td>
                <Text size="xs" c="dimmed">
                  {entry.user || "-"}
                </Text>
              </Table.Td>
              <Table.Td>
                <Text size="xs" c="dimmed" lineClamp={1}>
                  {entry.notes || "-"}
                </Text>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Box>
  );
}
