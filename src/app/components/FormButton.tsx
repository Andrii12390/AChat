import React from "react";

type FormButtonProps = {
  text: string; 
};

const FormButton: React.FC<FormButtonProps> = ({ text }) => {
  return (
    <button className="px-8 py-1 bg-gradient-to-tr from-indigo-500 to-indigo-700 hover:opacity-90 transition-all duration-150 rounded-md shadow-md font-semibold">
      {text}
    </button>
  );
};

export default FormButton;
