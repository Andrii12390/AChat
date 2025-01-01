'use client';

import { User } from "@prisma/client";
import { UserItem, SearchInput } from "@/components";
import { useMemo, useState } from "react";

interface UsersListProps {
  users: User[];
}

export const UsersList = ({ users }: UsersListProps) => {
  const [searchText, setSearchText] = useState("");

  const searchedUserList = useMemo(() => {
    return users.filter((item) =>
      item.username.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText, users]);

  return (
    <div className="flex flex-col h-dvh">
      <header className="bg-white dark:bg-neutral-950 z-10 py-3 px-3 sticky top-0">
        <SearchInput searchText={searchText} onSearchChange={setSearchText} />
      </header>
      <main className="flex-1 overflow-y-auto no-scrollbar px-3">
        <div className="flex flex-col gap-2">
          {searchedUserList.map((user) => (
            <UserItem key={user.id} data={user} />
          ))}
        </div>
      </main>
    </div>
  );
};
