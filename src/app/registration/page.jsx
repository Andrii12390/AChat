import "../globals.css";
import { Lock, UserRound } from "lucide-react";
import Link from "next/link";
import FormButton from "../components/FormButton";
import FormInput from "../components/FormInput";

const Registration = () => {
  return (
    <div className="h-dvh text-white flex justify-center bg-gradient-to-tr from-blue-300 to-purple-300">
      <form className="mt-60  p-2 h-fit flex flex-col gap-y-4">
        <h1 className="text-center text-2xl text-gray-800 ml-6 font-semibold">
          Registration
        </h1>
        <FormInput type="text" placeholder="Username" Icon={UserRound}/>
        <FormInput type="password" placeholder="Password" Icon={Lock}/>
        <FormInput type="password" placeholder="Confirm password" Icon={Lock}/>
        
        <div className="flex justify-center ml-6 pt-3">
          <FormButton text="Register"/>
        </div>
      </form>
    </div>
  );
};

export default Registration;
