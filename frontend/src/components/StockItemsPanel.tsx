// Stock Items Panel Component - displays expanded stock item details

import React, { useMemo, useState, useCallback } from "react";
import { ActionIcon, Anchor, Badge, Box, Table, Text } from "@mantine/core";
import { IconChevronDown, IconChevronRight, IconClock } from "@tabler/icons-react";
import type { InvenTreePluginContext } from "@inventreedb/ui";
import type { StockItem, StockTrackingEntry } from "../types";
import { formatDate } from "../utils";
import { StockTrackingPanel } from "./StockTrackingPanel";

interface StockItemsPanelProps {
  stockItems: StockItem[];
  context: InvenTreePluginContext;
}

export function StockItemsPanel({ stockItems, context }: StockItemsPanelProps) {
  // State for expanded items and their tracking data
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());
  const [trackingData, setTrackingData] = useState<Record<number, StockTrackingEntry[]>>({});
  const [loadingTracking, setLoadingTracking] = useState<Set<number>>(new Set());

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

  // Calculate column count for colspan
  const columnCount = useMemo(() => {
    let count = 6; // expand, location, quantity, check date, days since check, status
    if (hasSerial) count += 1;
    if (hasNotes) count += 1;
    return count;
  }, [hasSerial, hasNotes]);

  // Toggle expand/collapse for a stock item
  const toggleExpand = useCallback(async (stockId: number) => {
    if (expandedItems.has(stockId)) {
      // Collapse
      setExpandedItems(prev => {
        const next = new Set(prev);
        next.delete(stockId);
        return next;
      });
    } else {
      // Expand
      setExpandedItems(prev => new Set(prev).add(stockId));
      
      // Fetch tracking data if not already loaded
      if (!trackingData[stockId]) {
        setLoadingTracking(prev => new Set(prev).add(stockId));
        try {
          const response = await context.api.get(`/api/plugins/criticalcomponents/stock-tracking/${stockId}/`);
          setTrackingData(prev => ({ ...prev, [stockId]: response.data.entries || [] }));
        } catch (error) {
          console.error('Failed to fetch stock tracking:', error);
          setTrackingData(prev => ({ ...prev, [stockId]: [] }));
        } finally {
          setLoadingTracking(prev => {
            const next = new Set(prev);
            next.delete(stockId);
            return next;
          });
        }
      }
    }
  }, [expandedItems, trackingData, context.api]);

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
            <Table.Th style={{ width: 40 }} />
            {hasSerial && <Table.Th>Serial</Table.Th>}
            <Table.Th>Location</Table.Th>
            <Table.Th style={{ textAlign: "right" }}>Quantity</Table.Th>
            <Table.Th>Last Stock Qty Check Date</Table.Th>
            <Table.Th>Days Since Last Check</Table.Th>
            <Table.Th>Status</Table.Th>
            {hasNotes && <Table.Th>Notes</Table.Th>}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {stockItems.map((item) => (
            <React.Fragment key={item.id}>
              <Table.Tr>
                <Table.Td style={{ width: 40 }}>
                  <ActionIcon
                    variant="subtle"
                    size="sm"
                    onClick={() => toggleExpand(item.id)}
                    aria-label={expandedItems.has(item.id) ? "Collapse" : "Expand"}
                  >
                    {expandedItems.has(item.id) ? (
                      <IconChevronDown size={16} />
                    ) : (
                      <IconChevronRight size={16} />
                    )}
                  </ActionIcon>
                </Table.Td>
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
                  {item.days_since_check !== null ? (
                    <Badge
                      color={item.needs_check ? "orange" : "green"}
                      variant="light"
                      size="sm"
                      leftSection={item.needs_check ? <IconClock size={10} /> : null}
                    >
                      {item.days_since_check} days
                      {item.needs_check ? " - Needs Check" : ""}
                    </Badge>
                  ) : (
                    <Text size="sm" c="dimmed">-</Text>
                  )}
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
              {expandedItems.has(item.id) && (
                <Table.Tr>
                  <Table.Td colSpan={columnCount} style={{ padding: 0 }}>
                    <StockTrackingPanel
                      entries={trackingData[item.id] || []}
                      loading={loadingTracking.has(item.id)}
                    />
                  </Table.Td>
                </Table.Tr>
              )}
            </React.Fragment>
          ))}
        </Table.Tbody>
      </Table>
    </Box>
  );
}
