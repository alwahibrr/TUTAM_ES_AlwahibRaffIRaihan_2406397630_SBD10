'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'ghost';
  isLoading?: boolean;
}

export default function Button({
  children,
  variant = 'primary',
  isLoading = false,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const base =
    'relative w-full py-3 px-6 font-semibold text-sm tracking-wide transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed rounded-full';

  const variants: Record<string, string> = {
    primary:
      'bg-[#9AB17A] text-white hover:bg-[#9AB17A]/90 active:bg-[#9AB17A]/80 shadow-sm',
    ghost:
      'bg-transparent text-[#9AB17A] border border-[#9AB17A]/30 hover:border-[#9AB17A] hover:bg-[#9AB17A]/5 active:bg-[#9AB17A]/10',
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <span>Please wait…</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}
