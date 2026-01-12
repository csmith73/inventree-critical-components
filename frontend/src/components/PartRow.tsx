// Part Row Component - displays a single part with expandable stock items

import React, { useCallback, useState } from "react";
import {
  ActionIcon,
  Anchor,
  Avatar,
  Badge,
  Box,
  Collapse,
  Group,
  Progress,
  Text,
  Tooltip,
} from "@mantine/core";
import { IconAlertTriangle, IconChevronDown, IconChevronRight } from "@tabler/icons-react";
import type { InvenTreePluginContext } from "@inventreedb/ui";
import type { CriticalPart } from "../types";
import { formatStockDisplay, getStockStatus } from "../utils";
import { StockItemsPanel } from "./StockItemsPanel";

interface PartRowProps {
  part: CriticalPart;
  context: InvenTreePluginContext;
  showLocationQty?: boolean;
  showCategory?: boolean;
  isExpandable?: boolean;
  indent?: number;
}

export function PartRow({
  part,
  context,
  showLocationQty = false,
  showCategory = false,
  isExpandable = true,
  indent = 0,
}: PartRowProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const status = getStockStatus(part);
  const stockDisplay = formatStockDisplay(part, showLocationQty);
  const hasStockItems = part.stock_items && part.stock_items.length > 0;
  const canExpand = isExpandable && hasStockItems;

  const goToPart = useCallback(() => {
    context.navigate(`/part/${part.id}/`);
  }, [context, part.id]);

  const toggleExpand = useCallback(() => {
    if (canExpand) {
      setIsExpanded((prev) => !prev);
    }
  }, [canExpand]);

  // Determine grid columns based on view mode
  const gridColumns = showCategory
    ? "30px minmax(150px, 1.5fr) 100px minmax(120px, 1fr) minmax(100px, 1fr) 100px 110px minmax(140px, 1fr)"
    : "30px minmax(180px, 2fr) 100px minmax(100px, 1fr) 100px 110px minmax(140px, 1fr)";

  // Determine inventory status - check if any stock items need checking
  const getInvStatus = () => {
    // If no stock items, show not configured
    if (!part.stock_items || part.stock_items.length === 0) {
      return { label: "No Stock", color: "gray" };
    }
    // Check if any stock items have check_days_configured = false
    const anyNotConfigured = part.stock_items.some(item => !item.check_days_configured);
    if (anyNotConfigured && !part.has_needs_check) {
      // All items either not configured or within range
      const allNotConfigured = part.stock_items.every(item => !item.check_days_configured);
      if (allNotConfigured) {
        return { label: "Not Configured", color: "gray" };
      }
    }
    // has_needs_check comes from API - true if any stock item needs check
    if (part.has_needs_check) {
      return { label: "Needs Check", color: "orange" };
    }
    return { label: "Inv Up to Date", color: "green" };
  };
  const invStatus = getInvStatus();

  return (
    <>
      <Box
        px="md"
        py="xs"
        style={{
          display: "grid",
          gridTemplateColumns: gridColumns,
          gap: "12px",
          alignItems: "center",
          borderBottom: "1px solid var(--mantine-color-gray-2)",
          paddingLeft: `calc(var(--mantine-spacing-md) + ${indent * 16}px)`,
          backgroundColor: isExpanded ? "var(--mantine-color-gray-0)" : undefined,
        }}
        className="part-row"
      >
        {/* Expand/Collapse Icon */}
        <Box style={{ display: "flex", justifyContent: "center" }}>
          {canExpand ? (
            <ActionIcon variant="subtle" size="sm" onClick={toggleExpand}>
              {isExpanded ? (
                <IconChevronDown size={16} />
              ) : (
                <IconChevronRight size={16} />
              )}
            </ActionIcon>
          ) : (
            <Box style={{ width: 22 }} />
          )}
        </Box>

        {/* Part Name with Thumbnail */}
        <Group gap="sm" wrap="nowrap">
          <Avatar
            src={part.thumbnail || part.image}
            size="sm"
            radius="sm"
            color="gray"
          >
            {part.name.charAt(0)}
          </Avatar>
          <Box style={{ minWidth: 0, flex: 1 }}>
            <Anchor
              size="sm"
              fw={500}
              onClick={goToPart}
              style={{ cursor: "pointer" }}
              truncate
            >
              {part.name}
            </Anchor>
          </Box>
        </Group>

        {/* IPN - now a separate prominent column */}
        <Text size="sm" c={part.IPN ? "dark" : "dimmed"} truncate fw={part.IPN ? 500 : 400}>
          {part.IPN || "-"}
        </Text>

        {/* Category (only in "all" view) */}
        {showCategory && (
          <Text size="sm" c="dimmed" lineClamp={1} title={part.category_path}>
            {part.category_name || "Uncategorized"}
          </Text>
        )}

        {/* Description */}
        <Text size="sm" c="dimmed" lineClamp={1}>
          {part.description || "-"}
        </Text>

        {/* Qty Status Badge */}
        <Badge
          color={status.color}
          size="sm"
          variant="light"
          leftSection={
            status.label === "Low Stock" || status.label === "Out of Stock" ? (
              <IconAlertTriangle size={10} />
            ) : null
          }
        >
          {status.label}
        </Badge>

        {/* Inv Status Badge */}
        <Badge
          color={invStatus.color}
          size="sm"
          variant="light"
        >
          {invStatus.label}
        </Badge>

        {/* Stock Level with Progress Bar */}
        <Tooltip
          label={
            stockDisplay.showMin
              ? `${stockDisplay.stock} in stock / ${stockDisplay.min} minimum required`
              : `${stockDisplay.stock} in stock`
          }
          position="left"
        >
          <Group gap="sm" wrap="nowrap" justify="flex-end">
            <Progress
              value={status.progressValue}
              color={status.progressColor}
              size="sm"
              style={{ width: 60 }}
            />
            <Box style={{ minWidth: 80, textAlign: "right" }}>
              <Text size="sm" fw={500} component="span">
                {stockDisplay.stock}
              </Text>
              {stockDisplay.showMin && (
                <Text size="xs" c="dimmed" component="span">
                  {" "}
                  / {stockDisplay.min}{" "}
                  <Text component="span" size="xs" c="dimmed" fs="italic">
                    min
                  </Text>
                </Text>
              )}
            </Box>
          </Group>
        </Tooltip>
      </Box>

      {/* Expanded Stock Items */}
      {canExpand && (
        <Collapse in={isExpanded}>
          <StockItemsPanel stockItems={part.stock_items || []} context={context} />
        </Collapse>
      )}
    </>
  );
}
