'use client';

import React from 'react';

interface DatePickerProps {
  question: string;
  value: string;
  onChange: (value: string) => void;
  required: boolean;
}

const DatePicker: React.FC<DatePickerProps> = ({ question, value, onChange, required }) => {
  return (
    <div className="w-full">
        {question && (
          <h3 className="text-lg sm:text-xl font-medium text-slate-700 mb-3 sm:mb-4">
              {question}
              {required && <span className="text-red-500 ml-1">*</span>}
          </h3>
        )}
        <input
            id={question}
            type="date"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-3.5 sm:px-4 py-3.5 text-sm sm:text-base border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
        />
    </div>
  );
};

export default DatePicker;
