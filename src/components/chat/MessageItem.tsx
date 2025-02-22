"use client";

import type { TExtendedMessage } from "types";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { CldImage } from "next-cloudinary";

interface IMessageItem {
  data: TExtendedMessage;
}

export function MessageItem({ data }: IMessageItem) {
  const session = useSession();

  const isCurrentUserMessage = session.data?.user?.name === data.sender.username;

  return (
    <div
      className={`flex flex-col max-w-[60%] h-max rounded-xl words-break ${
        isCurrentUserMessage
          ? "ml-auto mr-2 bg-message-secondary rounded-br-none"
          : "mr-auto ml-2 rounded-bl-none bg-message-primary"
      } px-2 py-1`}
    >
      {data.image && (
        <CldImage
          src={data.image || ""}
          alt="Image"
          height={200}
          width={200}
          className="rounded-md"
        />
      )}
      <div className="text-sm">{data.text}</div>
      <div className={`text-[10px]  ${isCurrentUserMessage && "text-end"}`}>
        {format(new Date(data.createdAt), "p")}
      </div>
    </div>
  );
}
