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
  return useMemo(() => ({
    conversationId
  }), [conversationId])
}

export default useConversation