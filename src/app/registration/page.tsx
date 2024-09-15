import "../globals.css";
import React from "react";
import { RegistrationForm } from "../components/shared/forms/RegistrationForm";
const Registration: React.FC = () => {
  return (
    <div className="h-dvh text-white flex justify-center bg-gradient-to-tr from-blue-300 to-purple-300">
      <RegistrationForm />
    </div>
  );
};

export default Registration;
