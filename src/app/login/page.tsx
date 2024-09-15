import "../globals.css";
import React from "react";
import { LoginForm } from "../components/shared/forms/LoginForm";

const Login: React.FC = () => {
  return (
    <div className="h-dvh text-white flex justify-center bg-gradient-to-tr from-blue-300 to-purple-300">
     <LoginForm />
    </div>
  );
};

export default Login;
