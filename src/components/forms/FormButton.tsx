interface FormButtonProps {
  text: string;
}

export const FormButton = ({ text }: FormButtonProps) => {
  return (
    <button className="px-8 py-1 text-white bg-indigo-500 hover:bg-indigo-500/75 transition-colors rounded-md shadow-md font-semibold w-fit">
      {text}
    </button>
  );
};
