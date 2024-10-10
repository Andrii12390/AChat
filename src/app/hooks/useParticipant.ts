import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { CustomConversation } from "../types";
import { User } from "@prisma/client"


const useParticipant = (conversation: CustomConversation, currentUser: User) => {
  const session = useSession();
  if (!conversation?.participants) {
    return null
  }
  const participant = useMemo(() => {
  
    const participants = conversation.participants.filter((user) => user.userId !== currentUser.id )
    
    const participant = participants[0]

    return participant
  }, [session.data?.user?.name, conversation.participants])

  return participant
}

export default useParticipant