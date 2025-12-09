import React from 'react';
import { motion } from 'framer-motion';

interface CheckboxGroupProps {
  question: string;
  options: string[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  required: boolean;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ question, options, selectedValues, onChange, required }) => {
    const handleChange = (option: string) => {
        const newSelectedValues = selectedValues.includes(option)
          ? selectedValues.filter((item) => item !== option)
          : [...selectedValues, option];
        onChange(newSelectedValues);
      };

  return (
    <div className="w-full">
        <h3 className="text-xl font-medium text-slate-700 mb-4">
            {question}
            {required && <span className="text-red-500 ml-1">*</span>}
        </h3>
        <div className="space-y-3">
            {options.map((option) => {
                const isSelected = selectedValues.includes(option);
                return (
                    <motion.label
                        key={option}
                        className={`flex items-center w-full p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                            isSelected
                            ? 'bg-indigo-50 border-indigo-500 shadow-md'
                            : 'bg-white border-slate-300 hover:border-indigo-400'
                        }`}
                        whileTap={{ scale: 0.98 }}
                    >
                        <input
                            type="checkbox"
                            value={option}
                            checked={isSelected}
                            onChange={() => handleChange(option)}
                            className="sr-only" // Hide the actual checkbox
                        />
                         <span className={`text-lg ${isSelected ? 'font-semibold text-indigo-800' : 'text-slate-700'}`}>
                            {option}
                        </span>
                    </motion.label>
                );
            })}
        </div>
    </div>
  );
};

export default CheckboxGroup;
