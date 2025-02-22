import { useMemo } from "react";
import { TCustomConversation } from "types";
import { User } from "@prisma/client";

const useParticipant = (conversation: TCustomConversation, currentUser: User) => {
  const participant = useMemo(() => {
    if (!conversation?.participants) {
      return null;
    }

    const participants = conversation.participants.filter(
      (user) => user.userId !== currentUser.id
    );

    return participants[0];
  }, [conversation.participants, currentUser.id]);


  return participant;
};

export default useParticipant;
