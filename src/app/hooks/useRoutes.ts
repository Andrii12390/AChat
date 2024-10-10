import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { UsersRound } from "lucide-react";
import { Settings } from "lucide-react";
import useConversation from "./useConversation";

const useRoutes = () => {
  const path = usePathname();
  const { conversationId } = useConversation();
  const routes = useMemo(() => [
    {
      label: 'Chats',
      href: '/conversations',
      icon: MessageCircle,
      isActive: path.startsWith('/conversations') || !!conversationId
    },
    {
      label: 'People',
      href: '/people',
      icon: UsersRound,
      isActive: path === '/people'
    },
    {
      label: 'Settings',
      href: '/settings',
      icon: Settings,
      isActive: path === '/settings'
    },
  ], [path, conversationId]);
  return routes;
}

export default useRoutes