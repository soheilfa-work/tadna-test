import { cn } from "@/src/shared/lib/cn";

type BrandMarkProps = {
  className?: string;
  inverted?: boolean;
};

export function BrandMark({ className, inverted }: BrandMarkProps) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden>
        <rect
          width="36"
          height="36"
          rx="10"
          fill={inverted ? "#E85D04" : "#0B1F33"}
        />
        <path
          d="M9 12.5h18M18 12.5v12.2M12.2 24.7h11.6"
          stroke="white"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M11 19.2h6.4c2.3 0 3.6 1.2 3.6 3.1 0 2-1.4 3.2-3.7 3.2H11"
          stroke={inverted ? "#0B1F33" : "#E85D04"}
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </svg>
      <span className="leading-tight">
        <span
          className={cn(
            "block text-sm font-extrabold tracking-tight",
            inverted ? "text-white" : "text-ink",
          )}
        >
          تادنا
        </span>
        <span className={cn("block text-[11px]", inverted ? "text-white/70" : "text-muted")}>
          مدیریت یکپارچه ورزش
        </span>
      </span>
    </span>
  );
}
