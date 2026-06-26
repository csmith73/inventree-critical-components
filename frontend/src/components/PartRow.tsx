// Part Row Component - displays a single part with expandable stock items

import React, { useCallback, useState } from "react";
import {
  ActionIcon,
  Anchor,
  Avatar,
  Badge,
  Box,
  Button,
  Collapse,
  Group,
  NumberInput,
  Popover,
  Progress,
  Stack,
  Switch,
  Text,
  Tooltip,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import {
  IconAlertTriangle,
  IconChevronDown,
  IconChevronRight,
  IconLock,
  IconPencil,
} from "@tabler/icons-react";
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

  // Lead time manual-edit popover state
  const [editOpen, setEditOpen] = useState(false);
  const [editValue, setEditValue] = useState<number | string>(part.lead_time ?? "");
  const [editManual, setEditManual] = useState<boolean>(part.lead_time_manual ?? false);
  const [saving, setSaving] = useState(false);

  const openEditor = useCallback(() => {
    // Reset the form to the part's current values whenever the popover opens
    setEditValue(part.lead_time ?? "");
    setEditManual(part.lead_time_manual ?? false);
    setEditOpen(true);
  }, [part.lead_time, part.lead_time_manual]);

  const saveLeadTime = useCallback(async () => {
    setSaving(true);
    try {
      const leadTimeValue =
        editValue === "" || editValue === null ? null : Number(editValue);
      await context.api.post(
        "/plugin/criticalcomponents/set-lead-time/",
        {
          part_id: part.id,
          lead_time: leadTimeValue,
          manual: editManual,
        }
      );
      notifications.show({
        title: "Lead time updated",
        message: `${part.name}: ${
          leadTimeValue != null ? `${leadTimeValue}d` : "cleared"
        }${editManual ? " (manual)" : ""}`,
        color: "green",
      });
      setEditOpen(false);
      await context.queryClient.invalidateQueries({
        queryKey: ["critical-components"],
      });
    } catch (err) {
      notifications.show({
        title: "Failed to update lead time",
        message: err instanceof Error ? err.message : "Unknown error",
        color: "red",
      });
    } finally {
      setSaving(false);
    }
  }, [context, part.id, part.name, editValue, editManual]);

  // Determine grid columns based on view mode
  const gridColumns = showCategory
    ? "30px minmax(150px, 1.5fr) 100px minmax(120px, 1fr) minmax(100px, 1fr) 100px 110px 120px minmax(140px, 1fr)"
    : "30px minmax(180px, 2fr) 100px minmax(100px, 1fr) 100px 110px 120px minmax(140px, 1fr)";

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
            <Group gap="xs" wrap="nowrap">
              <Anchor
                size="sm"
                fw={500}
                onClick={goToPart}
                style={{ cursor: "pointer" }}
                truncate
              >
                {part.name}
              </Anchor>
              {part.trackable && (
                <Badge size="xs" variant="light" color="blue">
                  Trackable
                </Badge>
              )}
            </Group>
          </Box>
        </Group>

        {/* IPN - now a separate prominent column */}
        <Tooltip label={part.IPN} disabled={!part.IPN}>
          <Text size="sm" c={part.IPN ? "dark" : "dimmed"} truncate fw={part.IPN ? 500 : 400}>
            {part.IPN || "-"}
          </Text>
        </Tooltip>

        {/* Category (only in "all" view) */}
        {showCategory && (
          <Text size="sm" c="dimmed" lineClamp={1} title={part.category_path}>
            {part.category_name || "Uncategorized"}
          </Text>
        )}

        {/* Description */}
        <Tooltip label={part.description} disabled={!part.description}>
          <Text size="sm" c="dimmed" lineClamp={1}>
            {part.description || "-"}
          </Text>
        </Tooltip>

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

        {/* Lead Time (with manual-edit popover) */}
        <Group gap={4} wrap="nowrap">
          <Text size="sm">
            {part.lead_time != null ? `${part.lead_time}d` : "-"}
          </Text>
          {part.lead_time_manual && (
            <Tooltip label="Manual override (protected from recalculation)">
              <IconLock size={12} color="var(--mantine-color-blue-6)" />
            </Tooltip>
          )}
          <Popover
            opened={editOpen}
            onChange={setEditOpen}
            position="bottom"
            withArrow
            shadow="md"
            trapFocus
          >
            <Popover.Target>
              <Tooltip label="Edit lead time">
                <ActionIcon
                  variant="subtle"
                  size="xs"
                  color="gray"
                  onClick={openEditor}
                >
                  <IconPencil size={14} />
                </ActionIcon>
              </Tooltip>
            </Popover.Target>
            <Popover.Dropdown>
              <Stack gap="xs" style={{ minWidth: 220 }}>
                <Text size="sm" fw={600}>
                  Lead time — {part.name}
                </Text>
                <NumberInput
                  label="Lead time (days)"
                  value={editValue}
                  min={0}
                  allowDecimal={false}
                  placeholder="—"
                  onChange={(value) => {
                    setEditValue(value);
                    // Auto-enable manual override when the value is edited
                    setEditManual(true);
                  }}
                />
                <Switch
                  label="Manual override (protect from recalc)"
                  checked={editManual}
                  onChange={(event) =>
                    setEditManual(event.currentTarget.checked)
                  }
                />
                <Group justify="flex-end" gap="xs">
                  <Button
                    variant="default"
                    size="xs"
                    onClick={() => setEditOpen(false)}
                    disabled={saving}
                  >
                    Cancel
                  </Button>
                  <Button size="xs" onClick={saveLeadTime} loading={saving}>
                    Save
                  </Button>
                </Group>
              </Stack>
            </Popover.Dropdown>
          </Popover>
        </Group>

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
        <Collapse expanded={isExpanded}>
          <StockItemsPanel stockItems={part.stock_items || []} context={context} />
        </Collapse>
      )}
    </>
  );
}
