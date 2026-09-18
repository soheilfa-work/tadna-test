"use client";

import { ROLE_OPTIONS } from "@/src/modules/access/domain/roles";
import { WizardActions } from "@/src/shared/ui/wizard-actions";
import { cn } from "@/src/shared/lib/cn";
import type { OnboardingDraft } from "./types";

type Props = {
  draft: OnboardingDraft;
  error?: string;
  onChange: (patch: Partial<OnboardingDraft>) => void;
  onBack: () => void;
  onNext: () => void;
};

export function RoleStep({ draft, error, onChange, onBack, onNext }: Props) {
  return (
    <div>
      <h1 className="hidden text-xl font-bold text-heading lg:block">انتخاب نقش کاربر</h1>
      <p className="text-sm leading-8 text-muted lg:mt-2 lg:leading-7">
        نقش خود را انتخاب کنید. مشخصات و مدارک بعدی شما بر اساس نقش انتخابی تایید خواهد شد.
      </p>
      <div className="mt-6 space-y-2.5">
        {ROLE_OPTIONS.map((role) => {
          const selected = draft.roleCode === role.code;
          return (
            <button
              key={role.code}
              type="button"
              onClick={() =>
                onChange({
                  roleCode: role.code,
                  independent: role.code === "independent_athlete",
                })
              }
              className={cn(
                "flex w-full items-center gap-3 rounded-2xl border bg-white px-4 py-3.5 text-right transition-colors",
                selected ? "border-teal" : "border-line hover:border-teal/40",
              )}
            >
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-bold text-ink">{role.title}</span>
                <span className="mt-0.5 block text-xs leading-6 text-muted">{role.caption}</span>
              </span>
              <span
                className={cn(
                  "grid h-5 w-5 shrink-0 place-items-center rounded-full border",
                  selected ? "border-teal" : "border-[#c5d4d8]",
                )}
              >
                {selected ? <span className="h-2.5 w-2.5 rounded-full bg-teal" /> : null}
              </span>
            </button>
          );
        })}
      </div>
      {error ? <p className="mt-3 text-sm text-danger">{error}</p> : null}
      <WizardActions onBack={onBack} onNext={onNext} nextLabel="ادامه مسیر" />
    </div>
  );
}
