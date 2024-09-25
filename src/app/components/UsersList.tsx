import { User } from "@prisma/client"
import { UserItem } from "./"

interface UsersListProps {
  users: User[]
}

export const UsersList: React.FC<UsersListProps> = ({users}) =>{


  return (
    <div className="pb-10 w-full">
      <div className="py-2 px-4  text-lg font-semibold">
        Click on someone to start chat
      </div>
      <div className="flex flex-col gap-2">
        {users.map((user) => {
          return <UserItem  key={user.id}  data={user} />
        })}
      </div>
    </div>
  )
}