// Search Input Component - search field for filtering parts

import React from "react";
import { CloseButton, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchInput({
  value,
  onChange,
  placeholder = "Search parts by name, IPN, or description...",
}: SearchInputProps) {
  return (
    <TextInput
      value={value}
      placeholder={placeholder}
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
