import type { ReactNode } from "react";
import { cn } from "@/src/shared/lib/cn";

type FieldProps = {
  label: string;
  htmlFor: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: ReactNode;
  className?: string;
};

export function Field({
  label,
  htmlFor,
  required,
  hint,
  error,
  children,
  className,
}: FieldProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={htmlFor} className="text-sm text-ink">
        {label}
        {required ? <span className="mr-1 text-teal">*</span> : null}
      </label>
      {children}
      {error ? (
        <p className="text-xs text-danger" role="alert">
          {error}
        </p>
      ) : hint ? (
        <p className="text-xs text-muted">{hint}</p>
      ) : null}
    </div>
  );
}

export const inputClassName =
  "h-11 w-full rounded-xl border border-line bg-white px-4 text-sm text-ink outline-none transition-shadow placeholder:text-muted/70 focus:border-teal focus:ring-4 focus:ring-teal/10";
