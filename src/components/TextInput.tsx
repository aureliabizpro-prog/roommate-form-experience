import React from 'react';

interface TextInputProps {
  question: string;
  value: string;
  onChange: (value: string) => void;
  required: boolean;
  type?: 'text' | 'email';
  placeholder?: string;
}

const TextInput: React.FC<TextInputProps> = ({ question, value, onChange, required, type = 'text', placeholder }) => {
  return (
    <div className="w-full">
      {question && (
        <label htmlFor={question} className="block text-lg sm:text-xl font-medium text-slate-700 mb-3">
          {question}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        id={question}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3.5 sm:px-4 py-3 text-sm sm:text-base border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
      />
    </div>
  );
};

export default TextInput;
