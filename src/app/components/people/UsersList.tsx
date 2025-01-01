"use client";

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
    <div className="overflow-y-auto px-3 no-scrollbar max-h-[calc(100vh-0.5rem)]">
      <div className="sticky top-0 bg-white dark:bg-neutral-950/90 z-10 py-3">
        <SearchInput searchText={searchText} onSearchChange={setSearchText} />
      </div>
      <div className="flex flex-col gap-2">
        {searchedUserList.map((user) => {
          return <UserItem key={user.id} data={user} />;
        })}
      </div>
     
    </div>
  );
};
