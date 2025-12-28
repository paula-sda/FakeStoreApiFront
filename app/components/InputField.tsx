'use client';

interface InputFieldProps {
  label: string;
  type: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

export default function InputField({ label, type, value, placeholder, onChange, required }: InputFieldProps) {
  return (
    <label className="flex flex-col">
      <span className="text-purple-800 font-semibold">{label}</span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
        className="mt-1 border border-purple-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-black placeholder-purple-400 bg-white"
      />
    </label>
  );
}
