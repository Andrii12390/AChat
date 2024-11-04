import { getUser, getUsers } from "@/actions";
import { MobileSidebar, Sidebar, UsersList } from "@/components";

const PeopleLayout = async ({ children }: { children: React.ReactNode }) => {
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
      {children}
    </div>
  );
};

export default PeopleLayout;
