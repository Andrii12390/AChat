import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { UsersRound,MessageCircle } from "lucide-react";
import useConversation from "@/hooks/useConversation";

const useRoutes = () => {
  const path = usePathname();
  const { conversationId } = useConversation();
  const routes = useMemo(() => [
    {
      href: '/conversations',
      icon: MessageCircle,
      isActive: path.includes('/conversations') || !!conversationId
    },
    {
      href: '/people',
      icon: UsersRound,
      isActive: path.includes('/people')
    }
  ], [path, conversationId]);
  return routes;
}

export default useRoutes