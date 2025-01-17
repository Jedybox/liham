
interface InputFieldProps {
    label: string;
    type: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputField({
  label,
  type,
  name,
  value,
  onChange,
}: InputFieldProps): JSX.Element {
  return (
    <label htmlFor="" className="flex flex-col items-center font-azert font-bold">
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