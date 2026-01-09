import React, { useCallback, useMemo, useState } from "react";
import {
  ActionIcon,
  Alert,
  Anchor,
  Avatar,
  Badge,
  Box,
  CloseButton,
  Collapse,
  Divider,
  Group,
  Loader,
  Paper,
  Progress,
  SegmentedControl,
  Stack,
  Text,
  TextInput,
  Title,
  Tooltip,
  UnstyledButton,
} from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import {
  IconAlertTriangle,
  IconCategory,
  IconChevronDown,
  IconChevronRight,
  IconChevronsDown,
  IconChevronsUp,
  IconMapPin,
  IconSearch,
  IconX,
} from "@tabler/icons-react";

import { checkPluginVersion, type InvenTreePluginContext } from "@inventreedb/ui";
import { LocalizedComponent } from "./locale";

// Types for API response
interface CriticalPart {
  id: number;
  name: string;
  IPN?: string;
  description?: string;
  url: string;
  thumbnail?: string;
  image?: string;
  total_stock: number;
  quantity_at_location?: number; // Only in location view
  minimum_stock: number;
  is_low_stock: boolean;
  trackable: boolean;
}

interface GroupNode {
  id: number | null;
  name: string;
  pathstring?: string;
  icon?: string;
  parts: CriticalPart[];
  children: GroupNode[];
}

interface CriticalComponentsData {
  group_by: "category" | "location";
  categories?: GroupNode[];
  locations?: GroupNode[];
  total_parts: number;
  total_entries?: number;
  total_critical_low_stock: number;
}

type GroupByType = "category" | "location";

// Helper to get all group IDs for expand/collapse all
function getAllGroupIds(groups: GroupNode[], prefix: string): string[] {
  const ids: string[] = [];
  
  function collectIds(nodes: GroupNode[], level: number) {
    for (const node of nodes) {
      ids.push(`${prefix}-${node.id ?? "none"}-${level}`);
      if (node.children && node.children.length > 0) {
        collectIds(node.children, level + 1);
      }
    }
  }
  
  collectIds(groups, 0);
  return ids;
}

// Count parts in a group (including nested)
function countPartsInGroup(group: GroupNode): number {
  let count = group.parts ? group.parts.length : 0;
  if (group.children) {
    for (const child of group.children) {
      count += countPartsInGroup(child);
    }
  }
  return count;
}

// Filter groups based on search term
function filterGroups(groups: GroupNode[], searchTerm: string): GroupNode[] {
  if (!searchTerm) return groups;
  
  const lowerSearch = searchTerm.toLowerCase();
  
  function filterGroup(group: GroupNode): GroupNode | null {
    // Filter parts that match the search
    const matchingParts = group.parts.filter(
      (part) =>
        part.name.toLowerCase().includes(lowerSearch) ||
        (part.IPN && part.IPN.toLowerCase().includes(lowerSearch)) ||
        (part.description && part.description.toLowerCase().includes(lowerSearch))
    );
    
    // Recursively filter children
    const filteredChildren = group.children
      .map(filterGroup)
      .filter((child): child is GroupNode => child !== null);
    
    // Return group if it has matching parts or filtered children
    if (matchingParts.length > 0 || filteredChildren.length > 0) {
      return {
        ...group,
        parts: matchingParts,
        children: filteredChildren,
      };
    }
    
    return null;
  }
  
  return groups
    .map(filterGroup)
    .filter((group): group is GroupNode => group !== null);
}

// Get stock status info
function getStockStatus(part: CriticalPart) {
  const stock = part.total_stock ?? 0;
  const minStock = part.minimum_stock ?? 0;
  
  if (stock <= 0) {
    return {
      label: "Out of Stock",
      color: "red",
      progressColor: "red",
      progressValue: 0,
    };
  } else if (part.is_low_stock || (minStock > 0 && stock < minStock)) {
    const percentage = minStock > 0 ? Math.min((stock / minStock) * 100, 100) : 50;
    return {
      label: "Low Stock",
      color: "orange",
      progressColor: "orange",
      progressValue: percentage,
    };
  } else {
    const percentage = minStock > 0 ? Math.min((stock / minStock) * 100, 100) : 100;
    return {
      label: "In Stock",
      color: "green",
      progressColor: "teal",
      progressValue: percentage,
    };
  }
}

// Format stock display
function formatStock(part: CriticalPart, showLocationQty: boolean = false): string {
  if (showLocationQty && part.quantity_at_location !== undefined) {
    return `${part.quantity_at_location}`;
  }
  
  const stock = part.total_stock ?? 0;
  const min = part.minimum_stock ?? 0;
  
  if (min > 0) {
    return `${stock} / ${min}`;
  }
  return `${stock}`;
}

// Part row component
function PartRow({
  part,
  context,
  showLocationQty = false,
}: {
  part: CriticalPart;
  context: InvenTreePluginContext;
  showLocationQty?: boolean;
}) {
  const status = getStockStatus(part);

  const goToPart = useCallback(() => {
    context.navigate(`/part/${part.id}/`);
  }, [context, part.id]);

  return (
    <Box
      px="md"
      py="xs"
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(200px, 2fr) minmax(100px, 1fr) 100px minmax(120px, 1fr)",
        gap: "16px",
        alignItems: "center",
        borderBottom: "1px solid var(--mantine-color-gray-2)",
      }}
      className="part-row"
    >
      {/* Part Name with Thumbnail */}
      <Group gap="sm" wrap="nowrap" style={{ paddingLeft: "32px" }}>
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
          {part.IPN && (
            <Text size="xs" c="dimmed" truncate>
              {part.IPN}
            </Text>
          )}
        </Box>
      </Group>

      {/* Description */}
      <Text size="sm" c="dimmed" lineClamp={1}>
        {part.description || "-"}
      </Text>

      {/* Status Badge */}
      <Badge
        color={status.color}
        size="sm"
        variant="light"
        leftSection={
          status.label === "Low Stock" ? (
            <IconAlertTriangle size={10} />
          ) : null
        }
      >
        {status.label}
      </Badge>

      {/* Stock Level with Progress Bar */}
      <Group gap="sm" wrap="nowrap" justify="flex-end">
        <Progress
          value={status.progressValue}
          color={status.progressColor}
          size="sm"
          style={{ width: 80 }}
        />
        <Text size="sm" fw={500} style={{ minWidth: 60, textAlign: "right" }}>
          {formatStock(part, showLocationQty)}
        </Text>
      </Group>
    </Box>
  );
}

// Group header component (for categories or locations)
function GroupHeader({
  group,
  isExpanded,
  onToggle,
  level = 0,
  icon,
}: {
  group: GroupNode;
  isExpanded: boolean;
  onToggle: () => void;
  level?: number;
  icon: React.ReactNode;
}) {
  const partCount = useMemo(() => countPartsInGroup(group), [group]);

  if (partCount === 0) return null;

  return (
    <UnstyledButton
      onClick={onToggle}
      w="100%"
      px="md"
      py="xs"
      style={{
        backgroundColor: "var(--mantine-color-gray-1)",
        borderBottom: "1px solid var(--mantine-color-gray-3)",
      }}
    >
      <Group gap="xs" wrap="nowrap" style={{ paddingLeft: level * 16 }}>
        {isExpanded ? (
          <IconChevronDown size={16} color="gray" />
        ) : (
          <IconChevronRight size={16} color="gray" />
        )}
        {icon}
        <Text size="sm" fw={600} style={{ flex: 1 }}>
          {group.name}
        </Text>
        <Badge color="gray" size="sm" variant="light">
          {partCount}
        </Badge>
      </Group>
    </UnstyledButton>
  );
}

// Recursive group renderer
function GroupRenderer({
  group,
  context,
  expandedGroups,
  toggleGroup,
  level = 0,
  prefix,
  isLocationView = false,
}: {
  group: GroupNode;
  context: InvenTreePluginContext;
  expandedGroups: Set<string>;
  toggleGroup: (id: string) => void;
  level?: number;
  prefix: string;
  isLocationView?: boolean;
}) {
  const groupId = `${prefix}-${group.id ?? "none"}-${level}`;
  const isExpanded = expandedGroups.has(groupId);
  const partCount = countPartsInGroup(group);

  if (partCount === 0) return null;

  const hasParts = group.parts && group.parts.length > 0;
  const hasChildren = group.children && group.children.length > 0;

  return (
    <Box>
      <GroupHeader
        group={group}
        isExpanded={isExpanded}
        onToggle={() => toggleGroup(groupId)}
        level={level}
        icon={
          isLocationView ? (
            <IconMapPin size={16} color="gray" />
          ) : (
            <IconCategory size={16} color="gray" />
          )
        }
      />
      
      <Collapse in={isExpanded}>
        {/* Parts directly in this group */}
        {hasParts && (
          <Box>
            {group.parts.map((part) => (
              <PartRow
                key={`part-${part.id}-${group.id}`}
                part={part}
                context={context}
                showLocationQty={isLocationView}
              />
            ))}
          </Box>
        )}
        
        {/* Nested children */}
        {hasChildren &&
          group.children.map((child) => (
            <GroupRenderer
              key={`child-${child.id ?? "none"}-${level + 1}`}
              group={child}
              context={context}
              expandedGroups={expandedGroups}
              toggleGroup={toggleGroup}
              level={level + 1}
              prefix={prefix}
              isLocationView={isLocationView}
            />
          ))}
      </Collapse>
    </Box>
  );
}

// Table header
function TableHeader({ showLocationQty = false }: { showLocationQty?: boolean }) {
  return (
    <Box
      px="md"
      py="xs"
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(200px, 2fr) minmax(100px, 1fr) 100px minmax(120px, 1fr)",
        gap: "16px",
        backgroundColor: "var(--mantine-color-gray-2)",
        borderBottom: "1px solid var(--mantine-color-gray-3)",
      }}
    >
      <Text size="xs" fw={600} c="dimmed" tt="uppercase" style={{ paddingLeft: "32px" }}>
        Part Name
      </Text>
      <Text size="xs" fw={600} c="dimmed" tt="uppercase">
        Description
      </Text>
      <Text size="xs" fw={600} c="dimmed" tt="uppercase">
        Status
      </Text>
      <Text size="xs" fw={600} c="dimmed" tt="uppercase" ta="right">
        {showLocationQty ? "Qty at Location" : "Stock Level"}
      </Text>
    </Box>
  );
}

// Search input component
function SearchInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <TextInput
      value={value}
      placeholder="Search parts by name, IPN, or description..."
      leftSection={<IconSearch size={16} />}
      rightSection={
        value.length > 0 ? (
          <CloseButton size="sm" onClick={() => onChange("")} />
        ) : null
      }
      onChange={(e) => onChange(e.target.value)}
      style={{ flex: 1, maxWidth: 400 }}
    />
  );
}

// Main panel component
function CriticalComponentsPanel({
  context,
}: {
  context: InvenTreePluginContext;
}) {
  // State
  const [groupBy, setGroupBy] = useState<GroupByType>("category");
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearch] = useDebouncedValue(searchValue, 300);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

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
    return groupBy === "location" ? data.locations ?? [] : data.categories ?? [];
  }, [data, groupBy]);

  // Filter groups based on search
  const filteredGroups = useMemo(() => {
    return filterGroups(groups, debouncedSearch);
  }, [groups, debouncedSearch]);

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

  // Auto-expand first level on initial load
  React.useEffect(() => {
    if (filteredGroups.length > 0 && expandedGroups.size === 0) {
      const prefix = groupBy === "location" ? "loc" : "cat";
      const firstLevelIds = filteredGroups.map(
        (g) => `${prefix}-${g.id ?? "none"}-0`
      );
      setExpandedGroups(new Set(firstLevelIds));
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
            <Badge color="orange" size="lg" leftSection={<IconAlertTriangle size={12} />}>
              {data.total_critical_low_stock} Low Stock
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

            <Divider orientation="vertical" />

            {/* Expand/Collapse All */}
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
          </Group>
        </Group>
      </Paper>

      {/* Search results info */}
      {debouncedSearch && (
        <Text size="sm" c="dimmed">
          Showing results for "{debouncedSearch}"
          {filteredGroups.length === 0 && " - No matching parts found"}
        </Text>
      )}

      {/* Table */}
      {filteredGroups.length > 0 && (
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
