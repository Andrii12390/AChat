import getUsers from "../actions/getUsers"
import { Sidebar, UsersList } from "../components/"

export default async function ChatLayout({
  children
}: {
  children: React.ReactNode
}) {
  const users = await getUsers()
  return (
      <div>
        <Sidebar>
          <UsersList users={users}/>
        </Sidebar>
        <main>
          {children}
        </main>
      </div>
  )
}