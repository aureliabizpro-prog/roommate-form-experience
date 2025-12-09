import React from 'react';

interface LongTextAreaProps {
  question: string;
  value: string;
  onChange: (value: string) => void;
  required: boolean;
  placeholder?: string;
}

const LongTextArea: React.FC<LongTextAreaProps> = ({ question, value, onChange, required, placeholder }) => {
  return (
    <div className="w-full">
        {question && (
          <h3 className="text-lg sm:text-xl font-medium text-slate-700 mb-3 sm:mb-4">
              {question}
              {required && <span className="text-red-500 ml-1">*</span>}
          </h3>
        )}
        <textarea
            id={question}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            rows={4}
            className="w-full px-3.5 sm:px-4 py-3 text-sm sm:text-base border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all resize-none"
        />
    </div>
  );
};

export default LongTextArea;
