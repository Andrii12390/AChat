import { getUser, getUsers } from "../actions";
import { MobileSidebar, Sidebar, UsersList } from "../components/";

export default async function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const users = await getUsers();
  const user = await getUser();
  return (
    <div>
      <Sidebar user={user!}>
        <UsersList users={users} />
      </Sidebar>
      <MobileSidebar user={user!}>
        <UsersList users={users} />
      </MobileSidebar>
      <main>{children}</main>
    </div>
  );
}
