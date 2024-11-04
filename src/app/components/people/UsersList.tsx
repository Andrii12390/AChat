"use client";

import { User } from "@prisma/client";
import { UserItem, SearchInput } from "@/components";
import { useMemo, useState } from "react";

interface UsersListProps {
  users: User[];
}

export const UsersList = ({ users }: UsersListProps) => {
  const [searchText, setSearchText] = useState('');

  const searchedUserList = useMemo(() => {
    return users.filter(item => item.username.toLowerCase().includes(searchText.toLowerCase()));
  }, [searchText, users]);
  

  return (
    <div className="flex flex-col gap-2 px-3 overflow-y-auto pt-3">
      <SearchInput searchText={searchText} onSearchChange={setSearchText} />
      {searchedUserList.map((user) => {
        return <UserItem key={user.id} data={user} />;
      })}
    </div>
  );
};
