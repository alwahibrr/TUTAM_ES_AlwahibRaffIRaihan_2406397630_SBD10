'use client';

import { ReactNode } from 'react';

interface FormFieldProps {
  label: string;
  htmlFor: string;
  children: ReactNode;
  required?: boolean;
}

export default function FormField({
  label,
  htmlFor,
  children,
  required = false,
}: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={htmlFor}
        className="text-xs font-medium text-neutral-600 uppercase tracking-widest"
      >
        {label}
        {required && <span className="text-[#9AB17A] ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}
