import "../globals.css";
import { Lock, UserRound } from "lucide-react";
import Link from "next/link";
import FormButton from "../components/FormButton";
import FormInput from "../components/FormInput";
import React from "react";
const Login: React.FC = () => {
  return (
    <div className="h-dvh text-white flex justify-center bg-gradient-to-tr from-blue-300 to-purple-300">
      <form className="mt-60  p-2 h-fit flex flex-col gap-y-4">
        <h1 className="text-center text-2xl text-gray-800 ml-6 font-semibold">
          Login
        </h1>
        <FormInput type="text" placeholder="Username" Icon={UserRound}/>
        <FormInput type="password" placeholder="Password" Icon={Lock}/>
        <div className="flex justify-between items-center ml-7">
          <Link
            href="/"
            className="text-xs text-gray-800 hover:opacity-90 transition-all duration-150"
          >
            Forgot password?
          </Link>
          <Link
            href="/registration"
            className="text-xs text-gray-800 hover:text-gray-700 transition-colors duration-150"
          >
            Create account
          </Link>
        </div>
        <div className="flex justify-center ml-6">
          <FormButton text="Login" />
        </div>
      </form>
    </div>
  );
};

export default Login;
