'use client';

import React, { useState } from 'react';

interface EmailInputProps {
  question: string;
  value: string;
  onChange: (value: string) => void;
  required: boolean;
  placeholder?: string;
}

const COMMON_DOMAINS = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com'];

const EmailInput: React.FC<EmailInputProps> = ({ question, value, onChange, required, placeholder }) => {
  const [suggestion, setSuggestion] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentValue = e.target.value;
    onChange(currentValue);

    if (currentValue.includes('@')) {
      const [name, domain] = currentValue.split('@');
      if (domain.length > 0) {
        const match = COMMON_DOMAINS.find(d => d.startsWith(domain));
        if (match && match !== domain) {
          setSuggestion(name + '@' + match);
        } else {
          setSuggestion(null);
        }
      } else {
        setSuggestion(name + '@' + COMMON_DOMAINS[0]);
      }
    } else {
      setSuggestion(null);
    }
  };

  const handleSuggestionClick = () => {
    if (suggestion) {
      onChange(suggestion);
      setSuggestion(null);
    }
  };

  return (
    <div className="w-full">
      <label htmlFor={question} className="block text-xl font-medium text-slate-700 mb-3">
        {question}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        <input
          id={question}
          type="email"
          value={value}
          onChange={handleInputChange}
          placeholder={placeholder || "your.email@example.com"}
          className="w-full px-4 py-3 text-lg border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          autoComplete="off"
        />
        {suggestion && (
          <div 
            className="absolute top-full left-0 mt-1 w-full px-4 py-3 text-lg text-slate-400 border border-transparent rounded-lg cursor-pointer"
            onClick={handleSuggestionClick}
          >
            {suggestion}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailInput;
