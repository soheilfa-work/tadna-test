"use client";

import { useEffect, useRef } from "react";
import { WizardActions } from "@/src/shared/ui/wizard-actions";
import { onlyDigits, toPersianDigits } from "@/src/shared/lib/digits";
import { cn } from "@/src/shared/lib/cn";
import type { OnboardingDraft } from "./types";

type Props = {
  draft: OnboardingDraft;
  secondsLeft: number;
  error?: string;
  onChange: (patch: Partial<OnboardingDraft>) => void;
  onBack: () => void;
  onNext: () => void;
  onResend: () => void;
};

export function OtpStep({
  draft,
  secondsLeft,
  error,
  onChange,
  onBack,
  onNext,
  onResend,
}: Props) {
  const digits = draft.otp.split("");
  const refs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  useEffect(() => {
    refs[draft.otp.length]?.current?.focus();
  }, [draft.otp.length, refs]);

  const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const seconds = String(secondsLeft % 60).padStart(2, "0");
  const mobile = draft.mobileLocal.replace(/^0/, "");

  function setDigit(index: number, value: string) {
    const digit = onlyDigits(value, 1);
    const next = draft.otp.split("");
    next[index] = digit;
    const joined = next.join("").slice(0, 4);
    onChange({ otp: joined });
  }

  return (
    <div>
      <h1 className="hidden text-xl font-bold text-heading lg:block">تأیید هویت</h1>
      <p className="text-sm leading-8 text-muted lg:mt-2 lg:leading-7">
        کد تایید ارسال‌شده به شماره همراه {toPersianDigits(`0${mobile}`)} را وارد کنید:
      </p>
      <div className="mt-10 flex justify-center gap-3" dir="ltr">
        {Array.from({ length: 4 }).map((_, index) => (
          <input
            key={index}
            ref={refs[index]}
            className={cn(
              "h-16 w-14 rounded-2xl border bg-white text-center text-2xl font-bold outline-none",
              digits[index] ? "border-teal text-ink" : "border-line text-muted",
            )}
            inputMode="numeric"
            maxLength={1}
            placeholder="•"
            value={digits[index] ?? ""}
            onChange={(event) => setDigit(index, event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Backspace" && !digits[index] && index > 0) {
                refs[index - 1].current?.focus();
              }
            }}
          />
        ))}
      </div>
      <p className="mt-5 text-center text-sm text-muted">
        {secondsLeft > 0 ? (
          <>
            <span className="font-medium text-heading">{toPersianDigits(`${minutes}:${seconds}`)}</span>{" "}
            ثانیه مانده تا ارسال مجدد
          </>
        ) : (
          <button type="button" className="text-teal" onClick={onResend}>
            ارسال مجدد کد
          </button>
        )}
      </p>
      {error ? <p className="mt-3 text-center text-sm text-danger">{error}</p> : null}
      <WizardActions onBack={onBack} onNext={onNext} nextLabel="تایید و ادامه" />
    </div>
  );
}
