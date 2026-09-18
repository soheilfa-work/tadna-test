"use client";

import { Field, inputClassName } from "@/src/shared/ui/field";
import { WizardActions } from "@/src/shared/ui/wizard-actions";
import { onlyDigits } from "@/src/shared/lib/digits";
import { cn } from "@/src/shared/lib/cn";
import type { OnboardingDraft } from "./types";

type Props = {
  draft: OnboardingDraft;
  errors: Record<string, string>;
  onChange: (patch: Partial<OnboardingDraft>) => void;
  onBack: () => void;
  onNext: () => void;
};

export function PersonalStep({ draft, errors, onChange, onBack, onNext }: Props) {
  return (
    <div>
      <h1 className="hidden text-xl font-bold text-heading lg:block">اطلاعات فردی</h1>
      <div className="space-y-4 lg:mt-6">
        <Field label="نام" htmlFor="firstName" error={errors.firstName}>
          <input
            id="firstName"
            className={cn(inputClassName, "h-12")}
            value={draft.firstName}
            onChange={(event) => onChange({ firstName: event.target.value })}
          />
        </Field>
        <Field label="نام خانوادگی" htmlFor="lastName" error={errors.lastName}>
          <input
            id="lastName"
            className={cn(inputClassName, "h-12")}
            value={draft.lastName}
            onChange={(event) => onChange({ lastName: event.target.value })}
          />
        </Field>
        <Field label="کد ملی" htmlFor="nationalId" error={errors.nationalId}>
          <input
            id="nationalId"
            className={cn(inputClassName, "h-12")}
            inputMode="numeric"
            maxLength={10}
            value={draft.nationalId}
            onChange={(event) => onChange({ nationalId: onlyDigits(event.target.value, 10) })}
          />
        </Field>
        <Field label="تاریخ تولد" htmlFor="birthDate" error={errors.birthDate}>
          <input
            id="birthDate"
            className={cn(inputClassName, "h-12")}
            placeholder="۱۳۷۹/۰۵/۱۲"
            value={draft.birthDate}
            onChange={(event) => onChange({ birthDate: event.target.value })}
          />
        </Field>
        <div>
          <p className="mb-1.5 text-sm text-ink">جنسیت</p>
          <div className="grid grid-cols-2 gap-3">
            {(
              [
                { value: "male", label: "مرد" },
                { value: "female", label: "زن" },
              ] as const
            ).map((option) => {
              const selected = draft.gender === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => onChange({ gender: option.value })}
                  className={cn(
                    "h-12 rounded-xl border text-sm",
                    selected
                      ? "border-teal bg-[#e8f6f7] font-medium text-heading"
                      : "border-line bg-white text-ink",
                  )}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
          {errors.gender ? <p className="mt-1.5 text-xs text-danger">{errors.gender}</p> : null}
        </div>
      </div>
      <WizardActions onBack={onBack} onNext={onNext} nextLabel="ادامه ثبت‌نام" />
    </div>
  );
}
