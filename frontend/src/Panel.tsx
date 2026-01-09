import React, { useCallback, useMemo } from "react";
import {
  Accordion,
  Alert,
  Anchor,
  Avatar,
  Badge,
  Box,
  Group,
  Loader,
  Stack,
  Table,
  Text,
  Title,
} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import {
  IconAlertTriangle,
  IconCategory,
  IconCheck,
  IconX,
} from "@tabler/icons-react";

import { checkPluginVersion, type InvenTreePluginContext } from "@inventreedb/ui";
import { LocalizedComponent } from "./locale";

// Types for API response
interface StockLocation {
  location: string;
  location_id: number;
  quantity: number;
}

interface CriticalPart {
  pk: number;
  name: string;
  IPN?: string;
  description?: string;
  url: string;
  thumbnail?: string;
  image?: string;
  total_stock: number;
  minimum_stock: number;
  is_low_stock: boolean;
  trackable: boolean;
  stock_locations: StockLocation[];
}

interface Category {
  id: number | null;
  name: string;
  pathstring?: string;
  parts: CriticalPart[];
  children?: Category[];
}

interface CriticalComponentsData {
  categories: Category[];
  total_parts: number;
  total_critical_low_stock: number;
}

// Count parts in a category (including nested)
function countPartsInCategory(category: Category): number {
  let count = category.parts ? category.parts.length : 0;
  if (category.children) {
    for (const child of category.children) {
      count += countPartsInCategory(child);
    }
  }
  return count;
}

// Part row component
function PartRow({
  part,
  context,
}: {
  part: CriticalPart;
  context: InvenTreePluginContext;
}) {
  const stockColor = useMemo(() => {
    if (part.total_stock <= 0) return "red";
    if (part.is_low_stock) return "orange";
    return "green";
  }, [part.total_stock, part.is_low_stock]);

  const formatStock = useCallback(() => {
    const stock = part.total_stock || 0;
    const min = part.minimum_stock || 0;
    if (min > 0) {
      return `${stock} / ${min}`;
    }
    return `${stock}`;
  }, [part.total_stock, part.minimum_stock]);

  const goToPart = useCallback(() => {
    context.navigate(`/part/${part.pk}/`);
  }, [context, part.pk]);

  const goToLocation = useCallback(
    (locationId: number) => {
      context.navigate(`/stock/location/${locationId}/`);
    },
    [context]
  );

  return (
    <Table.Tr>
      <Table.Td>
        {part.thumbnail || part.image ? (
          <Avatar src={part.thumbnail || part.image} size="sm" radius="sm" />
        ) : (
          <Avatar size="sm" radius="sm" color="gray">
            -
          </Avatar>
        )}
      </Table.Td>
      <Table.Td>
        <Group gap="xs">
          <Anchor
            size="sm"
            fw={500}
            onClick={goToPart}
            style={{ cursor: "pointer" }}
          >
            {part.name}
          </Anchor>
          {part.IPN && (
            <Text size="xs" c="dimmed">
              ({part.IPN})
            </Text>
          )}
        </Group>
      </Table.Td>
      <Table.Td>
        <Text size="sm" c="dimmed" lineClamp={1} maw={250}>
          {part.description || "-"}
        </Text>
      </Table.Td>
      <Table.Td>
        <Text size="sm" fw={500} c={stockColor}>
          {formatStock()}
        </Text>
      </Table.Td>
      <Table.Td>
        <Group gap={4}>
          {part.is_low_stock ? (
            <Badge color="orange" size="sm" leftSection={<IconAlertTriangle size={12} />}>
              Low
            </Badge>
          ) : (
            <Badge color="green" size="sm" leftSection={<IconCheck size={12} />}>
              OK
            </Badge>
          )}
          {part.trackable && (
            <Badge color="blue" size="sm">
              Track
            </Badge>
          )}
        </Group>
      </Table.Td>
      <Table.Td>
        {part.stock_locations && part.stock_locations.length > 0 ? (
          <Group gap={4}>
            {part.stock_locations.slice(0, 2).map((loc) => (
              <Text key={loc.location_id} size="xs">
                <Anchor
                  size="xs"
                  onClick={() => goToLocation(loc.location_id)}
                  style={{ cursor: "pointer" }}
                >
                  {loc.location}
                </Anchor>
                : {loc.quantity}
              </Text>
            ))}
            {part.stock_locations.length > 2 && (
              <Text size="xs" c="dimmed">
                +{part.stock_locations.length - 2} more
              </Text>
            )}
          </Group>
        ) : (
          <Text size="xs" c="dimmed">
            -
          </Text>
        )}
      </Table.Td>
    </Table.Tr>
  );
}

// Parts table component
function PartsTable({
  parts,
  context,
}: {
  parts: CriticalPart[];
  context: InvenTreePluginContext;
}) {
  if (!parts || parts.length === 0) return null;

  return (
    <Table striped highlightOnHover withTableBorder>
      <Table.Thead>
        <Table.Tr>
          <Table.Th style={{ width: 40 }}></Table.Th>
          <Table.Th>Part</Table.Th>
          <Table.Th>Description</Table.Th>
          <Table.Th>Stock</Table.Th>
          <Table.Th>Status</Table.Th>
          <Table.Th>Locations</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {parts.map((part) => (
          <PartRow key={part.pk} part={part} context={context} />
        ))}
      </Table.Tbody>
    </Table>
  );
}

// Category accordion item
function CategoryItem({
  category,
  context,
  level = 0,
}: {
  category: Category;
  context: InvenTreePluginContext;
  level?: number;
}) {
  const partCount = useMemo(() => countPartsInCategory(category), [category]);

  if (partCount === 0) return null;

  const hasChildren = category.children && category.children.length > 0;
  const hasParts = category.parts && category.parts.length > 0;

  return (
    <Accordion.Item value={`cat-${category.id || "uncategorized"}-${level}`}>
      <Accordion.Control icon={<IconCategory size={16} />}>
        <Group justify="space-between" mr="md">
          <Group gap="xs">
            <Text fw={500}>{category.name}</Text>
            {level > 0 &&
              category.pathstring &&
              category.pathstring !== category.name && (
                <Text size="xs" c="dimmed">
                  {category.pathstring}
                </Text>
              )}
          </Group>
          <Badge color="gray" size="sm">
            {partCount}
          </Badge>
        </Group>
      </Accordion.Control>
      <Accordion.Panel>
        <Stack gap="md">
          {hasParts && <PartsTable parts={category.parts} context={context} />}
          {hasChildren && (
            <Box ml="md">
              <Accordion variant="separated">
                {category.children!.map((child) => (
                  <CategoryItem
                    key={child.id || "uncategorized"}
                    category={child}
                    context={context}
                    level={level + 1}
                  />
                ))}
              </Accordion>
            </Box>
          )}
        </Stack>
      </Accordion.Panel>
    </Accordion.Item>
  );
}

// Main panel component
function CriticalComponentsPanel({
  context,
}: {
  context: InvenTreePluginContext;
}) {
  // Fetch critical components data from the plugin API
  const { data, isLoading, isError, error } = useQuery<CriticalComponentsData>(
    {
      queryKey: ["critical-components"],
      queryFn: async () => {
        const response = await context.api.get("/plugin/criticalcomponents/list/");
        return response.data;
      },
    },
    context.queryClient
  );

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
  if (!data || !data.categories || data.total_parts === 0) {
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

  // Get default expanded categories (first level)
  const defaultExpanded = data.categories
    .filter((cat) => countPartsInCategory(cat) > 0)
    .map((cat) => `cat-${cat.id || "uncategorized"}-0`);

  return (
    <Stack gap="md">
      {/* Header */}
      <Group justify="space-between">
        <Title order={3}>Critical Components</Title>
        <Group gap="sm">
          <Badge color="blue" size="lg">
            {data.total_parts} Parts
          </Badge>
          {data.total_critical_low_stock > 0 && (
            <Badge color="orange" size="lg">
              {data.total_critical_low_stock} Low Stock
            </Badge>
          )}
        </Group>
      </Group>

      {/* Categories */}
      <Accordion variant="separated" multiple defaultValue={defaultExpanded}>
        {data.categories.map((category) => (
          <CategoryItem
            key={category.id || "uncategorized"}
            category={category}
            context={context}
          />
        ))}
      </Accordion>
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
