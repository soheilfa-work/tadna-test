"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthShell } from "../auth-shell";
import { parseJalaliInput } from "@/src/shared/lib/jalali-input";
import { isValidIranianNationalId } from "@/src/shared/lib/iran-national-id";
import { TEST_OPEN_AUTH } from "@/src/shared/config/test-flags";
import { ClubStep } from "./club-step";
import { DocumentsStep } from "./documents-step";
import { OtpStep } from "./otp-step";
import { PersonalStep } from "./personal-step";
import { PhoneStep } from "./phone-step";
import { ReviewStep } from "./review-step";
import { RoleStep } from "./role-step";
import { SuccessStep } from "./success-step";
import { EMPTY_ONBOARDING, type OnboardingDraft, type OnboardingStep } from "./types";

function toMobile(local: string) {
  const digits = local.replace(/\D/g, "");
  if (!digits) return "test";
  if (digits.startsWith("0")) return digits;
  if (digits.startsWith("9")) return `0${digits}`;
  return digits;
}

export function OnboardingFlow() {
  const router = useRouter();
  const [step, setStep] = useState<OnboardingStep>("phone");
  const [draft, setDraft] = useState<OnboardingDraft>(EMPTY_ONBOARDING);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [secondsLeft, setSecondsLeft] = useState(105);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{
    firstName: string;
    lastName: string;
    membershipNumber: string;
  } | null>(null);

  useEffect(() => {
    if (step !== "otp" || secondsLeft <= 0) return;
    const timer = window.setInterval(() => setSecondsLeft((value) => value - 1), 1000);
    return () => window.clearInterval(timer);
  }, [step, secondsLeft]);

  function patch(next: Partial<OnboardingDraft>) {
    setDraft((current) => ({ ...current, ...next }));
  }

  async function sendOtp() {
    const mobile = toMobile(draft.mobileLocal);
    if (!TEST_OPEN_AUTH && draft.mobileLocal.replace(/\D/g, "").length !== 10) {
      setErrors({ mobile: "شماره همراه را کامل وارد کنید." });
      return false;
    }
    try {
      const response = await fetch("/api/v1/auth/otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile }),
      });
      const body = (await response.json()) as { ok: boolean; message?: string };
      if (!TEST_OPEN_AUTH && !response.ok) {
        setErrors({ mobile: body.message ?? "ارسال کد ناموفق بود." });
        return false;
      }
    } catch {
      if (!TEST_OPEN_AUTH) {
        setErrors({ mobile: "ارسال کد ناموفق بود." });
        return false;
      }
    }
    setErrors({});
    setSecondsLeft(105);
    return true;
  }

  async function goFromPhone() {
    if (await sendOtp()) setStep("otp");
  }

  async function goFromOtp() {
    try {
      const response = await fetch("/api/v1/auth/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile: toMobile(draft.mobileLocal), code: draft.otp }),
      });
      const body = (await response.json()) as { ok: boolean; message?: string };
      if (!TEST_OPEN_AUTH && !response.ok) {
        setErrors({ otp: body.message ?? "کد تایید نادرست است." });
        return;
      }
    } catch {
      if (!TEST_OPEN_AUTH) {
        setErrors({ otp: "کد تایید نادرست است." });
        return;
      }
    }
    setErrors({});
    setStep("role");
  }

  function goFromRole() {
    if (!TEST_OPEN_AUTH && !draft.roleCode) {
      setErrors({ roleCode: "نقش را انتخاب کنید." });
      return;
    }
    setErrors({});
    setStep("personal");
  }

  function goFromPersonal() {
    if (!TEST_OPEN_AUTH) {
      const next: Record<string, string> = {};
      if (draft.firstName.trim().length < 2) next.firstName = "نام را وارد کنید.";
      if (draft.lastName.trim().length < 2) next.lastName = "نام خانوادگی را وارد کنید.";
      if (!isValidIranianNationalId(draft.nationalId)) next.nationalId = "کد ملی معتبر نیست.";
      if (!parseJalaliInput(draft.birthDate)) next.birthDate = "تاریخ تولد را کامل کنید.";
      if (!draft.gender) next.gender = "جنسیت را انتخاب کنید.";
      setErrors(next);
      if (Object.keys(next).length > 0) return;
    }
    setErrors({});
    setStep("club");
  }

  function goFromClub() {
    if (
      !TEST_OPEN_AUTH &&
      !draft.clubId &&
      !draft.independent &&
      draft.roleCode !== "independent_athlete"
    ) {
      setErrors({ club: "باشگاه را انتخاب کنید یا مسیر ورزشکار آزاد را بزنید." });
      return;
    }
    if (!draft.clubId && draft.roleCode === "independent_athlete") {
      patch({ independent: true });
    }
    setErrors({});
    setStep("documents");
  }

  function goFromDocuments() {
    if (!TEST_OPEN_AUTH) {
      const next: Record<string, string> = {};
      if (!draft.photo?.dataUrl) next.photo = "عکس پرسنلی الزامی است.";
      if (!draft.nationalIdCard?.dataUrl) next.nationalIdCard = "تصویر کارت ملی الزامی است.";
      setErrors(next);
      if (Object.keys(next).length > 0) return;
    }
    setErrors({});
    setStep("review");
  }

  async function submit() {
    const birth = parseJalaliInput(draft.birthDate) ?? { year: 1370, month: 1, day: 1 };
    setSubmitting(true);
    setErrors({});
    const documents = [
      draft.photo
        ? { type: "portrait_photo" as const, ...draft.photo }
        : undefined,
      draft.nationalIdCard
        ? { type: "national_id_card" as const, ...draft.nationalIdCard }
        : undefined,
      draft.medicalCertificate
        ? { type: "medical_certificate" as const, ...draft.medicalCertificate }
        : undefined,
    ].filter(Boolean);
    const fallbackSession = {
      firstName: draft.firstName.trim() || "ورزشکار",
      lastName: draft.lastName.trim() || "تست",
      membershipNumber: `TAD-${Math.floor(100000 + Math.random() * 900000)}`,
    };
    try {
      const response = await fetch("/api/v1/athletes/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: draft.firstName,
          lastName: draft.lastName,
          nationalId: draft.nationalId,
          mobile: toMobile(draft.mobileLocal),
          gender: draft.gender,
          birthYear: birth.year,
          birthMonth: birth.month,
          birthDay: birth.day,
          roleCode: draft.roleCode,
          membershipKind: draft.clubId ? "club" : "independent",
          clubId: draft.clubId || undefined,
          documents,
        }),
      });
      const body = (await response.json()) as {
        ok: boolean;
        message?: string;
        fields?: Record<string, string>;
        data?: {
          membershipNumber: string;
          firstName: string;
          lastName: string;
        };
      };
      const session =
        response.ok && body.data
          ? {
              firstName: body.data.firstName,
              lastName: body.data.lastName,
              membershipNumber: body.data.membershipNumber,
            }
          : TEST_OPEN_AUTH
            ? fallbackSession
            : null;
      if (!session) {
        setErrors({ form: body.message ?? "ثبت ناموفق بود." });
        return;
      }
      window.localStorage.setItem("tadna_session", JSON.stringify(session));
      setResult(session);
      setStep("success");
    } catch {
      if (!TEST_OPEN_AUTH) {
        setErrors({ form: "ثبت ناموفق بود." });
        return;
      }
      window.localStorage.setItem("tadna_session", JSON.stringify(fallbackSession));
      setResult(fallbackSession);
      setStep("success");
    } finally {
      setSubmitting(false);
    }
  }

  function goFromClubSkip() {
    patch({ independent: true, clubId: "" });
    setErrors({});
    setStep("documents");
  }

  const chrome =
    step === "phone"
      ? { title: "ورود به تادنا", onBack: () => router.push("/") }
      : step === "otp"
        ? { title: "تأیید هویت", onBack: () => setStep("phone") }
        : step === "role"
          ? { title: "انتخاب نقش کاربر", onBack: () => setStep("otp") }
          : step === "personal"
            ? { title: "اطلاعات فردی", onBack: () => setStep("role") }
            : step === "club"
              ? { title: "انتخاب باشگاه", onBack: () => setStep("personal") }
              : step === "documents"
                ? { title: "بارگذاری مدارک", onBack: () => setStep("club") }
                : step === "review"
                  ? { title: "مرور مشخصات", onBack: () => setStep("documents") }
                  : { title: undefined, onBack: undefined };

  return (
    <AuthShell title={chrome.title} onBack={chrome.onBack}>
      {step === "phone" ? (
        <PhoneStep
          draft={draft}
          error={errors.mobile}
          onChange={patch}
          onBack={() => router.push("/")}
          onNext={() => void goFromPhone()}
        />
      ) : null}
      {step === "otp" ? (
        <OtpStep
          draft={draft}
          secondsLeft={secondsLeft}
          error={errors.otp}
          onChange={patch}
          onBack={() => setStep("phone")}
          onNext={() => void goFromOtp()}
          onResend={() => void sendOtp()}
        />
      ) : null}
      {step === "role" ? (
        <RoleStep
          draft={draft}
          error={errors.roleCode}
          onChange={patch}
          onBack={() => setStep("otp")}
          onNext={goFromRole}
        />
      ) : null}
      {step === "personal" ? (
        <PersonalStep
          draft={draft}
          errors={errors}
          onChange={patch}
          onBack={() => setStep("role")}
          onNext={goFromPersonal}
        />
      ) : null}
      {step === "club" ? (
        <ClubStep
          draft={draft}
          error={errors.club}
          onChange={patch}
          onBack={() => setStep("personal")}
          onNext={goFromClub}
          onSkip={goFromClubSkip}
        />
      ) : null}
      {step === "documents" ? (
        <DocumentsStep
          draft={draft}
          errors={errors}
          onChange={patch}
          onBack={() => setStep("club")}
          onNext={goFromDocuments}
        />
      ) : null}
      {step === "review" ? (
        <ReviewStep
          draft={draft}
          submitting={submitting}
          error={errors.form}
          onSubmit={() => void submit()}
        />
      ) : null}
      {step === "success" && result ? (
        <SuccessStep
          firstName={result.firstName}
          lastName={result.lastName}
          membershipNumber={result.membershipNumber}
          issuedAt="بهمن ۱۴۰۴"
        />
      ) : null}
    </AuthShell>
  );
}
