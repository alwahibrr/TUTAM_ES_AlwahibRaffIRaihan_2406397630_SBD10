'use client';

import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', error, ...props }, ref) => {
    return (
      <div className="w-full">
        <input
          ref={ref}
          className={`
            w-full px-4 py-3 rounded-xl
            bg-white/60 border border-[#C3CC9B]
            text-neutral-800 placeholder-neutral-400
            outline-none transition-all duration-200
            focus:border-[#9AB17A] focus:bg-white
            hover:border-[#9AB17A]/70
            text-sm
            ${error ? 'border-red-500/60 focus:border-red-400' : ''}
            ${className}
          `}
          {...props}
        />
        {error && (
          <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
            {error}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
