export type CustomConversation = {
  id: number
  messages: {
    text: string,
    image: string,
    sender: {
      id: number;
      username: string;
    };
  }[];
  participants: {
    userId: number;  
    username: string;
  }[];
  avatarColor: string;
  avatar: string;
}

export type extendedMessage = {
  sender: {
      id: number;
      username: string;
  };
  id: number;
  text: string | null;
  image: string | null;
  senderId: number;
  conversationId: number;
  createdAt: Date;
}

export type TValidationRules = {
  required?: {
    value: boolean;
    message: string;
  };
  minLength?: {
    value: number;
    message: string
  };
  maxLength?: {
    value: number;
    message: string;
  };
}
