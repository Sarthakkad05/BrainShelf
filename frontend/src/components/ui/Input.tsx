interface InputProps {
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  className?: string;
}
export function Input({
  placeholder,
  value,
  onChange,
  onKeyDown,
  className = "",
}: InputProps) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      className={`px-4 py-3 border rounded dark:text-white dark:border-white dark:placeholder-gray-400 ${className}`}
    />
  );
}