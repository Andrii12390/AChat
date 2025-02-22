'use client'

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocale } from "next-intl";
import axios from "axios";
import { useRouter } from "next/navigation";


export const useCreateConversation = (userId: number) => {
  const queryClient = useQueryClient();
  
  const router = useRouter();

  const locale = useLocale();

  const { mutate,  isPending } = useMutation({
    mutationKey: ["create conversation"],
    mutationFn: async () => {
      try {
        const response = await axios.post("/api/conversations", { userId });
        if (response.status === 200) {
          return response.data; 
        }
        throw new Error("Failed to create conversation");
      } catch (error: any) {
        console.error(error);
      }
    },
    onSuccess: (data: number) => {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
      router.push(`/${locale}/conversations/${data}`);
    }
  });

  return { mutate, isPending };
};