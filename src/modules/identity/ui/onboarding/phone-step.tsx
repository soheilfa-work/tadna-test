"use client";

import { Field, inputClassName } from "@/src/shared/ui/field";
import { WizardActions } from "@/src/shared/ui/wizard-actions";
import { onlyDigits } from "@/src/shared/lib/digits";
import { cn } from "@/src/shared/lib/cn";
import type { OnboardingDraft } from "./types";

type Props = {
  draft: OnboardingDraft;
  error?: string;
  onChange: (patch: Partial<OnboardingDraft>) => void;
  onBack: () => void;
  onNext: () => void;
};

export function PhoneStep({ draft, error, onChange, onBack, onNext }: Props) {
  return (
    <div>
      <h1 className="hidden text-xl font-bold text-heading lg:block">ورود به تادنا</h1>
      <p className="text-sm leading-8 text-muted lg:mt-2 lg:leading-7">
        برای ورود یا ثبت‌نام جدید در سامانه ملی ورزش، لطفا شماره تلفن همراه خود را وارد نمایید.
      </p>
      <Field label="شماره تلفن همراه" htmlFor="mobile" className="mt-8" error={error}>
        <div className="flex gap-2" dir="ltr">
          <span className="grid h-12 w-[4.5rem] place-items-center rounded-xl border border-line bg-white text-sm text-muted">
            +98
          </span>
          <input
            id="mobile"
            className={cn(inputClassName, "h-12 text-left tracking-wide")}
            inputMode="numeric"
            maxLength={10}
            placeholder="۹۱۲۳۴۵۶۷۸۹"
            value={draft.mobileLocal}
            onChange={(event) => onChange({ mobileLocal: onlyDigits(event.target.value, 10) })}
          />
        </div>
      </Field>
      <WizardActions onBack={onBack} onNext={onNext} nextLabel="ارسال کد تایید" />
    </div>
  );
}
