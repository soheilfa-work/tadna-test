import type { ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/src/shared/lib/cn";

type Variant = "teal" | "navy" | "outline" | "ghost";

function classes(variant: Variant, fullWidth?: boolean, className?: string) {
  return cn(
    "inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50",
    fullWidth && "w-full",
    variant === "teal" && "bg-teal text-white hover:bg-teal-dark",
    variant === "navy" && "bg-navy text-white hover:bg-ocean-deep",
    variant === "outline" && "border border-teal bg-white text-teal hover:bg-sand",
    variant === "ghost" && "text-muted hover:text-ink",
    className,
  );
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  fullWidth?: boolean;
  href?: undefined;
  children?: ReactNode;
};

type ButtonLinkProps = {
  href: string;
  variant?: Variant;
  fullWidth?: boolean;
  className?: string;
  children?: ReactNode;
};

export function Button(props: ButtonProps | ButtonLinkProps) {
  const variant = props.variant ?? "teal";
  const className = classes(variant, props.fullWidth, props.className);

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={className}>
        {props.children}
      </Link>
    );
  }

  const rest = { ...(props as ButtonProps) };
  delete rest.variant;
  delete rest.fullWidth;
  const type = rest.type ?? "button";
  delete rest.type;
  delete rest.className;
  return <button type={type} className={className} {...rest} />;
}
