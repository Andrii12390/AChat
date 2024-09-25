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

