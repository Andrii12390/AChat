import { getUser } from "../actions";
import { SettingsMenu } from "../components";

export default async function page() {
  const user = await getUser()
  return (
    <div className="h-full dark:text-white flex justify-center bg-gradient-to-tr from-blue-300 to-purple-300">
      <SettingsMenu avatar={user?.avatar} />
    </div>
  );
}
