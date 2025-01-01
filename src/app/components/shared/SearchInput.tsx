import { useTranslations } from 'next-intl';

interface SearchInputProps {
  searchText: string;
  onSearchChange: (text: string) => void;
}

export const SearchInput = ({ searchText, onSearchChange }: SearchInputProps) => {
  const t = useTranslations('PeoplePage');
  
  return (
    <input
      type="text"
      className=" bg-slate-100 dark:bg-neutral-900 px-3 py-2 rounded-full outline-none w-full"
      placeholder={t("placeholder.search")}
      value={searchText}
      onChange={(e) => onSearchChange(e.target.value)}
    />
  );
};
