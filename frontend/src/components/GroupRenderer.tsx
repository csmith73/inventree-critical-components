// Group Renderer Component - recursively renders category/location groups

import React from "react";
import { Box, Collapse } from "@mantine/core";
import type { InvenTreePluginContext } from "@inventreedb/ui";
import type { GroupNode } from "../types";
import { countPartsInGroup } from "../utils";
import { GroupHeader } from "./GroupHeader";
import { PartRow } from "./PartRow";

interface GroupRendererProps {
  group: GroupNode;
  context: InvenTreePluginContext;
  expandedGroups: Set<string>;
  toggleGroup: (id: string) => void;
  level?: number;
  prefix: string;
  isLocationView?: boolean;
}

export function GroupRenderer({
  group,
  context,
  expandedGroups,
  toggleGroup,
  level = 0,
  prefix,
  isLocationView = false,
}: GroupRendererProps) {
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
        isLocationView={isLocationView}
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
                isExpandable={true}
                indent={level + 1}
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
