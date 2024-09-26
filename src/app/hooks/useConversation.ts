import { useParams } from "next/navigation";
import { useMemo } from "react";

const useConversation = () => {
  const params = useParams();

  const conversationId = useMemo(() => {
    if (!params?.id) {
      return '';
    }

    return params.id
  }, [params?.id])
  const isOpen = useMemo(() => !!conversationId, [conversationId]);
  return useMemo(() => ({
    isOpen,
    conversationId
  }), [isOpen, conversationId])
}

export default useConversation