// SearchInput.tsx
import React from 'react';

interface SearchInputProps {
  searchText: string;
  onSearchChange: (text: string) => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({ searchText, onSearchChange }) => {
  return (
    <input
      type="text"
      className="bg-slate-100 dark:bg-neutral-900 px-3 py-2 rounded-full outline-none"
      placeholder="Search by username"
      value={searchText}
      onChange={(e) => onSearchChange(e.target.value)}
    />
  );
};
