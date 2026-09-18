"use client";

import { searchClubs } from "@/src/modules/clubs";
import { WizardActions } from "@/src/shared/ui/wizard-actions";
import { cn } from "@/src/shared/lib/cn";
import type { OnboardingDraft } from "./types";

type Props = {
  draft: OnboardingDraft;
  error?: string;
  onChange: (patch: Partial<OnboardingDraft>) => void;
  onBack: () => void;
  onNext: () => void;
  onSkip: () => void;
};

export function ClubStep({ draft, error, onChange, onBack, onNext, onSkip }: Props) {
  const clubs = searchClubs(draft.clubQuery);

  return (
    <div>
      <h1 className="hidden text-xl font-bold text-heading lg:block">انتخاب باشگاه</h1>
      <p className="text-sm leading-8 text-muted lg:mt-2 lg:leading-7">
        اگر به عنوان ورزشکار رسمی باشگاه فعالیت می‌کنید، نام باشگاه خود را جستجو و انتخاب نمایید
        (اختیاری):
      </p>
      <label className="relative mt-5 block">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
            <path d="M20 20l-3-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </span>
        <input
          className="h-12 w-full rounded-xl border border-line bg-white px-4 pl-11 text-sm outline-none focus:border-teal"
          placeholder="المپیک غرب"
          value={draft.clubQuery}
          onChange={(event) => onChange({ clubQuery: event.target.value, independent: false })}
        />
      </label>
      <div className="mt-3 space-y-2">
        {clubs.map((club) => {
          const selected = draft.clubId === club.id && !draft.independent;
          return (
            <button
              key={club.id}
              type="button"
              onClick={() => onChange({ clubId: club.id, independent: false })}
              className={cn(
                "flex w-full items-center justify-between rounded-2xl border bg-white px-4 py-3.5 text-right",
                selected ? "border-teal" : "border-line hover:border-teal/40",
              )}
            >
              <span>
                <span className="block text-sm font-bold text-ink">{club.name}</span>
                <span className="mt-1 block text-xs text-muted">
                  {club.locationLabel} • {club.sportsLabel}
                </span>
              </span>
              <span className="text-muted">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </span>
            </button>
          );
        })}
      </div>
      <div className="mt-4 rounded-2xl bg-[#e8f4f6] px-4 py-4">
        <p className="font-bold text-heading">باشگاهی ندارید؟</p>
        <p className="mt-1 text-sm leading-7 text-muted">
          در صورت عدم عضویت رسمی، می‌توانید ثبت‌نام خود را به صورت «ورزشکار آزاد» تکمیل کنید.
        </p>
        <button
          type="button"
          className="mt-2 text-sm text-teal"
          onClick={onSkip}
        >
          ثبت‌نام به عنوان ورزشکار آزاد ←
        </button>
      </div>
      {error ? <p className="mt-3 text-sm text-danger">{error}</p> : null}
      <WizardActions
        onBack={onBack}
        onNext={onNext}
        nextLabel="تایید باشگاه و ادامه"
        secondaryLabel="ادامه"
        onSecondary={onSkip}
      />
    </div>
  );
}
