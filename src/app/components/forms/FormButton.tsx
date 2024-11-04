interface FormButtonProps {
  text: string;
}

export const FormButton = ({ text }: FormButtonProps) => {
  return (
    <button className="px-8 py-1 bg-gradient-to-tr from-indigo-500 to-indigo-700 hover:opacity-90 transition-all rounded-md shadow-md font-semibold w-fit">
      {text}
    </button>
  );
};
