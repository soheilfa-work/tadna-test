"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BrandMark } from "@/src/shared/ui/brand-mark";
import { Button } from "@/src/shared/ui/button";
import { brand } from "@/src/shared/config/brand";
import { toPersianDigits } from "@/src/shared/lib/digits";
import { cn } from "@/src/shared/lib/cn";
import { validateRegisterAthleteInput } from "@/src/modules/athletes/application/validation";
import type { RegisterAthleteInput } from "@/src/modules/athletes/domain/types";
import { StepClub } from "./step-club";
import { StepDocuments } from "./step-documents";
import { StepIdentity } from "./step-identity";
import { StepLocation } from "./step-location";
import { StepReview } from "./step-review";
import {
  EMPTY_REGISTRATION_DRAFT,
  REGISTRATION_STEPS,
  type RegistrationDraft,
} from "./types";

function toPayload(draft: RegistrationDraft): RegisterAthleteInput {
  const documents = [
    draft.photo
      ? { type: "portrait_photo" as const, ...draft.photo }
      : undefined,
    draft.nationalIdCard
      ? { type: "national_id_card" as const, ...draft.nationalIdCard }
      : undefined,
    draft.guardianConsent
      ? { type: "guardian_consent" as const, ...draft.guardianConsent }
      : undefined,
  ].filter(Boolean) as RegisterAthleteInput["documents"];

  return {
    firstName: draft.firstName,
    lastName: draft.lastName,
    fatherName: draft.fatherName,
    nationalId: draft.nationalId,
    mobile: draft.mobile,
    gender: draft.gender,
    birthYear: Number(draft.birthYear) || 0,
    birthMonth: Number(draft.birthMonth) || 0,
    birthDay: Number(draft.birthDay) || 0,
    provinceId: draft.provinceId,
    countyId: draft.countyId,
    sportScope: draft.sportScope,
    membershipKind: draft.membershipKind,
    clubId: draft.clubId || undefined,
    roleCode: "independent_athlete",
    documents,
  };
}

function fieldsForStep(step: number): string[] {
  if (step === 0) {
    return ["firstName", "lastName", "fatherName", "nationalId", "mobile", "gender", "birthDate", "photo"];
  }
  if (step === 1) return ["provinceId", "countyId", "sportScope"];
  if (step === 2) return ["membershipKind", "clubId"];
  if (step === 3) {
    return ["nationalIdCard", "guardianName", "guardianNationalId", "guardianMobile", "guardianConsent"];
  }
  return ["acceptedPrivacy"];
}

export function RegistrationWizard() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<RegistrationDraft>(EMPTY_REGISTRATION_DRAFT);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const current = REGISTRATION_STEPS[step];
  const progress = ((step + 1) / REGISTRATION_STEPS.length) * 100;

  const stepErrors = useMemo(() => {
    const next: Record<string, string> = {};
    for (const key of fieldsForStep(step)) {
      if (errors[key]) next[key] = errors[key];
    }
    return next;
  }, [errors, step]);

  function patchDraft(patch: Partial<RegistrationDraft>) {
    setDraft((currentDraft) => ({ ...currentDraft, ...patch }));
  }

  function validateCurrentStep() {
    const payload = toPayload(draft);
    const { errors: allErrors } = validateRegisterAthleteInput(payload);
    const relevant: Record<string, string> = {};
    for (const key of fieldsForStep(step)) {
      if (allErrors[key]) relevant[key] = allErrors[key];
    }
    setErrors(allErrors);
    return Object.keys(relevant).length === 0;
  }

  function goNext() {
    if (!validateCurrentStep()) return;
    setStep((value) => Math.min(value + 1, REGISTRATION_STEPS.length - 1));
  }

  async function submit() {
    if (!validateCurrentStep()) return;
    setSubmitting(true);
    setFormError("");
    try {
      const response = await fetch("/api/v1/athletes/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(toPayload(draft)),
      });
      const body = (await response.json()) as {
        ok: boolean;
        message?: string;
        fields?: Record<string, string>;
        data?: { trackingCode: string };
      };
      if (!response.ok || !body.ok || !body.data) {
        setErrors(body.fields ?? {});
        setFormError(body.message ?? "ارسال درخواست ناموفق بود.");
        return;
      }
      router.push(`/register/status/${body.data.trackingCode}`);
    } catch {
      setFormError("ارتباط با سرور برقرار نشد.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-dvh bg-sand lg:grid lg:grid-cols-[minmax(280px,420px)_minmax(0,1fr)]">
      <aside className="relative overflow-hidden bg-ink px-5 py-4 text-white lg:sticky lg:top-0 lg:flex lg:h-dvh lg:flex-col lg:px-8 lg:py-8">
        <div className="pointer-events-none absolute inset-0 opacity-40">
          <div className="absolute -left-16 top-10 h-56 w-56 rounded-full bg-ember/40 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-navy blur-3xl" />
        </div>
        <div className="relative flex items-center justify-between gap-3 lg:block">
          <Link href="/" className="inline-flex">
            <BrandMark inverted />
          </Link>
          <p className="text-[11px] text-white/60 lg:mt-6">{brand.pilotName}</p>
        </div>

        <div className="relative mt-5 lg:mt-12">
          <h1 className="text-2xl font-extrabold leading-10 lg:text-4xl lg:leading-[3.4rem]">
            ثبت‌نام ورزشکار
          </h1>
          <p className="mt-2 hidden max-w-sm text-sm leading-7 text-white/70 lg:block">
            {brand.shortClaim} پرونده اداری شما از پروفایل عمومی آینده جدا می‌ماند.
          </p>
        </div>

        <div className="relative mt-5 lg:hidden">
          <div className="mb-2 flex items-center justify-between text-xs text-white/70">
            <span>{current.title}</span>
            <span>
              گام {toPersianDigits(step + 1)} از {toPersianDigits(REGISTRATION_STEPS.length)}
            </span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-white/15">
            <div className="h-full rounded-full bg-ember transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <ol className="relative mt-10 hidden flex-1 space-y-5 lg:block">
          {REGISTRATION_STEPS.map((item, index) => {
            const done = index < step;
            const active = index === step;
            return (
              <li key={item.id} className="flex gap-3">
                <span
                  className={cn(
                    "mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-bold",
                    done && "bg-ember text-white",
                    active && "bg-white text-ink",
                    !done && !active && "bg-white/10 text-white/50",
                  )}
                >
                  {done ? "✓" : toPersianDigits(index + 1)}
                </span>
                <span>
                  <span className={cn("block text-sm font-semibold", active ? "text-white" : "text-white/70")}>
                    {item.title}
                  </span>
                  <span className="mt-1 block text-xs text-white/45">{item.caption}</span>
                </span>
              </li>
            );
          })}
        </ol>

        <p className="relative mt-6 hidden text-[11px] leading-6 text-white/40 lg:block">
          {brand.disclaimer}
        </p>
      </aside>

      <main className="flex min-h-dvh flex-col">
        <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 pb-28 pt-5 sm:px-8 lg:pb-10 lg:pt-10">
          <div className="mb-6 hidden items-center justify-between lg:flex">
            <div>
              <p className="text-sm text-muted">
                گام {toPersianDigits(step + 1)} از {toPersianDigits(REGISTRATION_STEPS.length)}
              </p>
              <h2 className="mt-1 text-2xl font-extrabold text-ink">{current.title}</h2>
            </div>
            <Link href="/" className="text-sm text-muted hover:text-ink">
              بازگشت به خانه
            </Link>
          </div>
          <h2 className="mb-4 text-xl font-extrabold text-ink lg:hidden">{current.caption}</h2>

          <section className="rounded-[28px] border border-line bg-white p-4 shadow-[0_18px_50px_rgba(11,31,51,0.06)] sm:p-6">
            {step === 0 ? <StepIdentity draft={draft} errors={stepErrors} onChange={patchDraft} /> : null}
            {step === 1 ? <StepLocation draft={draft} errors={stepErrors} onChange={patchDraft} /> : null}
            {step === 2 ? <StepClub draft={draft} errors={stepErrors} onChange={patchDraft} /> : null}
            {step === 3 ? <StepDocuments draft={draft} errors={stepErrors} onChange={patchDraft} /> : null}
            {step === 4 ? <StepReview draft={draft} errors={stepErrors} onChange={patchDraft} /> : null}
            {formError ? <p className="mt-4 text-sm text-danger">{formError}</p> : null}
          </section>
        </div>

        <div className="sticky bottom-0 z-10 border-t border-line bg-white/95 px-4 py-3 backdrop-blur lg:static lg:border-0 lg:bg-transparent lg:px-8 lg:py-0">
          <div className="mx-auto flex w-full max-w-3xl gap-3 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
            {step > 0 ? (
              <Button variant="navy" className="flex-1 lg:flex-none lg:min-w-32" onClick={() => setStep((value) => value - 1)}>
                قبلی
              </Button>
            ) : (
              <Button href="/" variant="navy" className="flex-1 lg:hidden">
                انصراف
              </Button>
            )}
            {step < REGISTRATION_STEPS.length - 1 ? (
              <Button className="flex-2 lg:flex-none lg:min-w-40" onClick={goNext}>
                ادامه
              </Button>
            ) : (
              <Button className="flex-2 lg:flex-none lg:min-w-44" disabled={submitting} onClick={() => void submit()}>
                {submitting ? "در حال ارسال..." : "ثبت درخواست"}
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
