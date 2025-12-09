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
        <h3 className="text-xl font-medium text-slate-700 mb-4">
            {question}
            {required && <span className="text-red-500 ml-1">*</span>}
        </h3>
        <input
            id={question}
            type="date"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-4 py-3 text-lg border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
        />
    </div>
  );
};

export default DatePicker;
