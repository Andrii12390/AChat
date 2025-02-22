import { useTranslations } from 'next-intl';

interface SearchInputProps {
  searchText: string;
  onSearchChange: (text: string) => void;
}

export const SearchInput = ({ searchText, onSearchChange }: SearchInputProps) => {
  const t = useTranslations('Shared');
  
  return (
    <input
      type="text"
      className=" bg-input px-3 py-2 rounded-full outline-none w-full"
      placeholder={t("search.placeholder")}
      value={searchText}
      onChange={(e) => onSearchChange(e.target.value)}
    />
  );
};
