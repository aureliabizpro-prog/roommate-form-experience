import React from 'react';
import { motion } from 'framer-motion';

interface RadioGroupProps {
  question: string;
  options: string[];
  selectedValue: string;
  onChange: (value: string) => void;
  required: boolean;
}

const RadioGroup: React.FC<RadioGroupProps> = ({ question, options, selectedValue, onChange, required }) => {
  return (
    <div className="w-full">
      {question && (
        <h3 className="text-lg sm:text-xl font-medium text-slate-700 mb-3 sm:mb-4">
          {question}
          {required && <span className="text-red-500 ml-1">*</span>}
        </h3>
      )}
      <div className="space-y-2 sm:space-y-3">
        {options?.map((option) => {
          const isSelected = selectedValue === option;
          return (
            <motion.label
              key={option}
              className={`flex items-center w-full min-h-[56px] p-3.5 sm:p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                isSelected
                  ? 'bg-indigo-50 border-indigo-500 shadow-md'
                  : 'bg-white border-slate-300 hover:border-indigo-400 active:border-indigo-500'
              }`}
              whileTap={{ scale: 0.98 }}
            >
              <input
                type="radio"
                name={question}
                value={option}
                checked={isSelected}
                onChange={() => onChange(option)}
                className="sr-only" // Hide the actual radio button
              />
              <span className={`text-sm sm:text-base leading-relaxed ${isSelected ? 'font-semibold text-indigo-800' : 'text-slate-700'}`}>
                {option}
              </span>
            </motion.label>
          );
        })}
      </div>
    </div>
  );
};

export default RadioGroup;
