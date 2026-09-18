"use client";

import { cn } from "@/src/shared/lib/cn";
import { Field, inputClassName } from "@/src/shared/ui/field";

type Option = {
  value: string;
  label: string;
};

type SelectFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
  required?: boolean;
  error?: string;
  disabled?: boolean;
  className?: string;
};

export function SelectField({
  id,
  label,
  value,
  onChange,
  options,
  placeholder = "انتخاب کنید",
  required,
  error,
  disabled,
  className,
}: SelectFieldProps) {
  return (
    <Field label={label} htmlFor={id} required={required} error={error} className={className}>
      <div className="relative">
        <select
          id={id}
          value={value}
          disabled={disabled}
          onChange={(event) => onChange(event.target.value)}
          className={cn(inputClassName, "appearance-none pe-10")}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-muted">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path
              d="M4 6l4 4 4-4"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </Field>
  );
}
