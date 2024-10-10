import { getUsers } from "../actions";
import { MobileSidebar, Sidebar, UsersList } from "../components/";

export default async function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const users = await getUsers();
  return (
    <div>
      <Sidebar>
        <UsersList users={users} />
      </Sidebar>
      <MobileSidebar>
        <UsersList users={users} />
      </MobileSidebar>
      <main>{children}</main>
    </div>
  );
}
