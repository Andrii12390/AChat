"use client";

import {
  ConversationList,
  MobileSidebar,
  Sidebar,
} from "@/components";

import axios from "axios";

import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Layout = ({ children }: {children: React.ReactNode}) => {

  const path = usePathname();
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    async function getUser() {
      const res = await axios.get("/api/users")
      setUser(res.data)
    }
    getUser()
  }, [])
  
  const conversations = useQuery({
    queryKey: ["conversations"],
    queryFn: () => axios.get("/api/conversations").then((res) => res.data),
  });

  return (
    <main className="h-dvh">
      {!path.includes("conversations/") && (
        <MobileSidebar
          isLoading={!user || conversations.isLoading}
          user={user}
        >
          <ConversationList list={conversations.data} currentUser={user} />
        </MobileSidebar>
      )}
      <Sidebar
        isLoading={!user || conversations.isLoading}
        user={user}
      >
        <ConversationList list={conversations.data} currentUser={user} />
      </Sidebar>
      {children}
    </main>
  );
};

export default Layout;
