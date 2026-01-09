// Group Header Component - displays category or location group header

import React, { useMemo } from "react";
import { Badge, Group, Text, UnstyledButton } from "@mantine/core";
import { IconCategory, IconChevronDown, IconChevronRight, IconMapPin } from "@tabler/icons-react";
import type { GroupNode } from "../types";
import { countPartsInGroup } from "../utils";

interface GroupHeaderProps {
  group: GroupNode;
  isExpanded: boolean;
  onToggle: () => void;
  level?: number;
  isLocationView?: boolean;
}

export function GroupHeader({
  group,
  isExpanded,
  onToggle,
  level = 0,
  isLocationView = false,
}: GroupHeaderProps) {
  const partCount = useMemo(() => countPartsInGroup(group), [group]);

  if (partCount === 0) return null;

  const Icon = isLocationView ? IconMapPin : IconCategory;

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
        <Icon size={16} color="gray" />
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
