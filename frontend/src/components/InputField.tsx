
interface InputFieldProps {
    label: string;
    type: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function InputField({
  label,
  type,
  name,
  value,
  onChange,
}: InputFieldProps): JSX.Element {
  return (
    <label htmlFor="" className="flex flex-col items-center font-azert font-bold tracking-tighter">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={label}
        className="w-72 h-10 p-3 text-center shadow-inputfield text-black bg-primary rounded-xl placeholder-black onfocus:outline-none"
      />
    </label>
  );
}

interface InputFieldSignUpProps {
  value: string;
  type: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function InputFieldSignUp({
  value,
  type,
  placeholder,
  onChange,
}: InputFieldSignUpProps) : JSX.Element {
return (
  <label htmlFor="" className="flex flex-col items-center font-azert font-bold tracking-tighter">
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-72 h-10 p-3 text-center bg-white border-2 border-slate-950 shadow-inputfield text-black bg-primary rounded-xl  placeholder-zinc-800 "
    />
  </label>
);
}

export { InputFieldSignUp };
export default InputField;