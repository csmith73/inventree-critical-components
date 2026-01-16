// Critical Components Panel - Main panel component

import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActionIcon,
  Alert,
  Badge,
  Box,
  Divider,
  Group,
  Loader,
  Paper,
  SegmentedControl,
  Stack,
  Switch,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import {
  IconAlertTriangle,
  IconCategory,
  IconChevronsDown,
  IconChevronsUp,
  IconClock,
  IconList,
  IconMapPin,
  IconX,
  IconBoxOff,
} from "@tabler/icons-react";
import { checkPluginVersion, type InvenTreePluginContext } from "@inventreedb/ui";

import { LocalizedComponent } from "./locale";
import type { CriticalComponentsData, GroupByType } from "./types";
import { filterGroups, filterGroupsLowStockOnly, filterGroupsNeedsCheckOnly, getAllGroupIds } from "./utils";
import {
  AllPartsTable,
  GroupRenderer,
  SearchInput,
  TableHeader,
} from "./components";

// Main panel component
function CriticalComponentsPanel({
  context,
}: {
  context: InvenTreePluginContext;
}) {
  // State
  const [groupBy, setGroupBy] = useState<GroupByType>("all");
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearch] = useDebouncedValue(searchValue, 300);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());
  const [showLowStockOnly, setShowLowStockOnly] = useState(false);
  const [showNeedsCheckOnly, setShowNeedsCheckOnly] = useState(false);

  // Fetch critical components data
  const { data, isLoading, isError, error } = useQuery<CriticalComponentsData>(
    {
      queryKey: ["critical-components", groupBy],
      queryFn: async () => {
        const response = await context.api.get(
          `/plugin/criticalcomponents/list/?group_by=${groupBy}`
        );
        return response.data;
      },
    },
    context.queryClient
  );

  // Get the groups (categories or locations)
  const groups = useMemo(() => {
    if (!data) return [];
    if (groupBy === "location") return data.locations ?? [];
    if (groupBy === "category") return data.categories ?? [];
    return [];
  }, [data, groupBy]);

  // Filter groups based on search, low stock filter, and needs check filter
  const filteredGroups = useMemo(() => {
    let result = filterGroups(groups, debouncedSearch);
    if (showLowStockOnly) {
      result = filterGroupsLowStockOnly(result);
    }
    if (showNeedsCheckOnly) {
      result = filterGroupsNeedsCheckOnly(result);
    }
    return result;
  }, [groups, debouncedSearch, showLowStockOnly, showNeedsCheckOnly]);

  // All group IDs for expand/collapse all
  const allGroupIds = useMemo(() => {
    const prefix = groupBy === "location" ? "loc" : "cat";
    return getAllGroupIds(filteredGroups, prefix);
  }, [filteredGroups, groupBy]);

  // Toggle single group expansion
  const toggleGroup = useCallback((groupId: string) => {
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(groupId)) {
        next.delete(groupId);
      } else {
        next.add(groupId);
      }
      return next;
    });
  }, []);

  // Expand all groups
  const expandAll = useCallback(() => {
    setExpandedGroups(new Set(allGroupIds));
  }, [allGroupIds]);

  // Collapse all groups
  const collapseAll = useCallback(() => {
    setExpandedGroups(new Set());
  }, []);

  // Reset expanded state when switching views
  const handleGroupByChange = useCallback((value: string) => {
    setGroupBy(value as GroupByType);
    setExpandedGroups(new Set());
  }, []);

  // Auto-expand all levels on initial load
  useEffect(() => {
    if (
      filteredGroups.length > 0 &&
      expandedGroups.size === 0 &&
      groupBy !== "all"
    ) {
      const prefix = groupBy === "location" ? "loc" : "cat";
      const allIds = getAllGroupIds(filteredGroups, prefix);
      setExpandedGroups(new Set(allIds));
    }
  }, [filteredGroups.length, groupBy]);

  // Loading state
  if (isLoading) {
    return (
      <Stack align="center" justify="center" p="xl">
        <Loader size="lg" />
        <Text c="dimmed">Loading critical components...</Text>
      </Stack>
    );
  }

  // Error state
  if (isError) {
    return (
      <Alert
        icon={<IconX size={16} />}
        title="Error Loading Data"
        color="red"
        variant="light"
      >
        {error instanceof Error
          ? error.message
          : "Failed to load critical components"}
      </Alert>
    );
  }

  // Empty state
  if (!data || data.total_parts === 0) {
    return (
      <Stack gap="md">
        <Group justify="space-between">
          <Title order={3}>Critical Components</Title>
        </Group>
        <Alert
          icon={<IconAlertTriangle size={16} />}
          title="No Critical Components Found"
          color="gray"
          variant="light"
        >
          <Text size="sm">No parts have been marked as critical components.</Text>
          <Text size="xs" c="dimmed" mt="xs">
            To mark a part as critical, add the "CriticalComponent" parameter to a
            part and set its value to "True".
          </Text>
        </Alert>
      </Stack>
    );
  }

  const prefix = groupBy === "location" ? "loc" : "cat";
  const showGroupedView = groupBy === "category" || groupBy === "location";

  return (
    <Stack gap="md">
      {/* Header */}
      <Group justify="space-between" wrap="wrap">
        <Group gap="sm">
          <Title order={3}>Critical Components</Title>
          <Badge color="blue" size="lg">
            {data.total_parts} Parts
          </Badge>
          {data.total_critical_low_stock > 0 && (
            <Badge
              color="orange"
              size="lg"
              leftSection={<IconAlertTriangle size={12} />}
            >
              {data.total_critical_low_stock} Low Stock
            </Badge>
          )}
          {(data.total_out_of_stock ?? 0) > 0 && (
            <Badge
              color="red"
              size="lg"
              leftSection={<IconBoxOff size={12} />}
            >
              {data.total_out_of_stock} Out of Stock
            </Badge>
          )}
          {(data.total_needs_check ?? 0) > 0 && (
            <Badge
              color="yellow"
              size="lg"
              leftSection={<IconClock size={12} />}
            >
              {data.total_needs_check} Needs Check
            </Badge>
          )}
        </Group>
      </Group>

      {/* Toolbar */}
      <Paper p="sm" withBorder>
        <Group justify="space-between" wrap="wrap" gap="sm">
          {/* Search */}
          <SearchInput value={searchValue} onChange={setSearchValue} />

          {/* Actions */}
          <Group gap="xs">
            {/* View Toggle */}
            <SegmentedControl
              value={groupBy}
              onChange={handleGroupByChange}
              data={[
                {
                  label: (
                    <Group gap={4}>
                      <IconList size={14} />
                      <span>All</span>
                    </Group>
                  ),
                  value: "all",
                },
                {
                  label: (
                    <Group gap={4}>
                      <IconCategory size={14} />
                      <span>Category</span>
                    </Group>
                  ),
                  value: "category",
                },
                {
                  label: (
                    <Group gap={4}>
                      <IconMapPin size={14} />
                      <span>Location</span>
                    </Group>
                  ),
                  value: "location",
                },
              ]}
              size="xs"
            />

            {/* Expand/Collapse All (only for grouped views) */}
            {showGroupedView && (
              <>
                <Divider orientation="vertical" />
                <Tooltip label="Expand All">
                  <ActionIcon variant="light" onClick={expandAll}>
                    <IconChevronsDown size={16} />
                  </ActionIcon>
                </Tooltip>
                <Tooltip label="Collapse All">
                  <ActionIcon variant="light" onClick={collapseAll}>
                    <IconChevronsUp size={16} />
                  </ActionIcon>
                </Tooltip>
              </>
            )}

            {/* Low Stock Filter */}
            <Divider orientation="vertical" />
            <Tooltip label="Show only low stock items">
              <Switch
                checked={showLowStockOnly}
                onChange={(event) => setShowLowStockOnly(event.currentTarget.checked)}
                label="Low Stock Only"
                size="xs"
                color="orange"
                thumbIcon={
                  showLowStockOnly ? (
                    <IconAlertTriangle size={10} color="orange" />
                  ) : null
                }
              />
            </Tooltip>

            {/* Needs Check Filter */}
            <Tooltip label="Show only items needing stock check">
              <Switch
                checked={showNeedsCheckOnly}
                onChange={(event) => setShowNeedsCheckOnly(event.currentTarget.checked)}
                label="Needs Stock Count Only"
                size="xs"
                color="yellow"
                thumbIcon={
                  showNeedsCheckOnly ? (
                    <IconClock size={10} color="orange" />
                  ) : null
                }
              />
            </Tooltip>
          </Group>
        </Group>
      </Paper>

      {/* Search results info */}
      {debouncedSearch && showGroupedView && (
        <Text size="sm" c="dimmed">
          Showing results for "{debouncedSearch}"
          {filteredGroups.length === 0 && " - No matching parts found"}
        </Text>
      )}

      {/* Content based on view mode */}
      {groupBy === "all" ? (
        /* All Parts Table (flat view) */
        <AllPartsTable
          parts={data.parts ?? []}
          context={context}
          searchTerm={debouncedSearch}
          showLowStockOnly={showLowStockOnly}
          showNeedsCheckOnly={showNeedsCheckOnly}
        />
      ) : (
        /* Grouped View (category or location) */
        filteredGroups.length > 0 && (
          <Paper withBorder style={{ overflow: "hidden" }}>
            <TableHeader showLocationQty={groupBy === "location"} />
            <Box style={{ maxHeight: "60vh", overflowY: "auto" }}>
              {filteredGroups.map((group) => (
                <GroupRenderer
                  key={`group-${group.id ?? "none"}-0`}
                  group={group}
                  context={context}
                  expandedGroups={expandedGroups}
                  toggleGroup={toggleGroup}
                  level={0}
                  prefix={prefix}
                  isLocationView={groupBy === "location"}
                />
              ))}
            </Box>
          </Paper>
        )
      )}
    </Stack>
  );
}

// Export function called by InvenTree to render the panel
export function renderPanel(context: InvenTreePluginContext) {
  checkPluginVersion(context);

  return (
    <LocalizedComponent locale={context.locale}>
      <CriticalComponentsPanel context={context} />
    </LocalizedComponent>
  );
}

export default renderPanel;
