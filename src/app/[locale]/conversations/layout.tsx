"use client";

import { ConversationList, MobileSidebar, Sidebar } from "@/components";

import axios from "axios";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { usePathname } from "@/i18n/routing";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathName = usePathname();
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getUser() {
      const res = await axios.get("/api/users");
      setUser(res.data);
    }
    getUser();
  }, []);

  const conversations = useQuery({
    queryKey: ["conversations"],
    queryFn: () => axios.get("/api/conversations").then((res) => res.data),
    gcTime: 0,
  });

  return (
    <main className="h-dvh">
      {pathName === "/conversations" && (
        <MobileSidebar isLoading={!user || conversations.isLoading} user={user}>
          <ConversationList list={conversations.data} currentUser={user} />
        </MobileSidebar>
      )}
      <Sidebar isLoading={!user || conversations.isLoading} user={user}>
        <ConversationList list={conversations.data} currentUser={user} />
      </Sidebar>
      {children}
    </main>
  );
};

export default Layout;
