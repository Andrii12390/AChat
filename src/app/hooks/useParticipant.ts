import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { CustomConversation } from "@/types";
import { User } from "@prisma/client";

const useParticipant = (conversation: CustomConversation, currentUser: User) => {
  const session = useSession();

  const participant = useMemo(() => {
    if (!conversation?.participants) {
      return null;
    }

    const participants = conversation.participants.filter(
      (user) => user.userId !== currentUser.id
    );

    return participants[0];
  }, [session.data?.user?.name, conversation.participants, currentUser.id]);


  return participant;
};

export default useParticipant;
