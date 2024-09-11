import Image from "next/image";

export default function ChatHeader({user}) {
  return (
    <div className="border-b border-white/10 p-2">
      <div className="flex gap-2 items-center">
        <Image src={user.profileImage} width={35} className="rounded-full" />
        <div className="flex flex-col">
          <div className="text-sm">{user.username}</div>
          <div className="text-xs text-blue-400">{user.activeStatus}</div>
        </div>
      </div>
    </div>
  );
}