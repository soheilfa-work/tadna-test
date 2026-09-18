import { brand } from "@/src/shared/config/brand";
import { Button } from "@/src/shared/ui/button";
import { AuthShell } from "@/src/modules/identity/ui/auth-shell";

function TrophyIcon() {
  return (
    <svg
      className="text-heading/35 lg:hidden"
      width="56"
      height="56"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M8 4h8v3a4 4 0 0 1-8 0V4Z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path d="M8 5H5.5A2.5 2.5 0 0 0 8 7.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M16 5h2.5A2.5 2.5 0 0 1 16 7.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M12 11v3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M9 20h6M10 17h4v3h-4v-3Z" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export function LandingCard() {
  return (
    <div className="flex flex-1 flex-col items-center text-center lg:min-h-[520px] lg:items-start lg:justify-center lg:text-right">
      <div className="flex flex-1 flex-col items-center justify-center lg:flex-none lg:items-start">
        <TrophyIcon />
        <h1 className="mt-8 text-[32px] font-extrabold text-heading lg:mt-0 lg:text-4xl">
          {brand.productName}
        </h1>
        <p className="mt-3 text-base font-semibold text-teal lg:text-lg">{brand.tagline}</p>
        <p className="mt-4 max-w-sm text-sm leading-8 text-muted lg:max-w-md lg:leading-7">
          {brand.landingBody}
        </p>
        <div className="mt-8 hidden w-full items-center gap-3 lg:flex">
          <Button href="/onboarding" className="flex-1">
            ورود به سامانه
          </Button>
          <Button href="/onboarding" variant="navy" className="min-w-28 px-8">
            ثبت نام
          </Button>
        </div>
      </div>
      <Button href="/onboarding" fullWidth className="h-12 lg:hidden">
        شروع فرایند
      </Button>
      <p className="pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-6 text-xs text-muted lg:hidden">
        {brand.footer}
      </p>
    </div>
  );
}

export default function HomePage() {
  return (
    <AuthShell>
      <LandingCard />
    </AuthShell>
  );
}
