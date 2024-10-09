export type CustomConversation = {
  id: string
  messages: {
    text: string,
    sender: {
      id: number;
      username: string;
      password: string;
      createdAt: Date;
      updatedAt: Date;
    };
    seenByUsers: {
      user: {
        id: number;
        username: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
      };
    }[];
  }[];
  participants: {
    userId: number;  
    username: string; 
  }[];
}

export type extendedMessage = {
    sender: {
        id: number;
        username: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
    };

    id: number;
    text: string | null;
    image: string | null;
    senderId: number;
    conversationId: number;
    createdAt: Date;
    updatedAt: Date;
}