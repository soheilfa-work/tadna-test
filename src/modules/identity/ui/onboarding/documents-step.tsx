"use client";

import { WizardActions } from "@/src/shared/ui/wizard-actions";
import { cn } from "@/src/shared/lib/cn";
import { toPersianDigits } from "@/src/shared/lib/digits";
import { isAllowedDocumentType, MAX_DOCUMENT_BYTES } from "@/src/shared/lib/uploads";
import type { DocumentDraft, OnboardingDraft } from "./types";

type Props = {
  draft: OnboardingDraft;
  errors: Record<string, string>;
  onChange: (patch: Partial<OnboardingDraft>) => void;
  onBack: () => void;
  onNext: () => void;
};

function readFile(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("خواندن فایل ناموفق بود."));
    reader.readAsDataURL(file);
  });
}

function ProgressRow({
  title,
  extra,
  file,
}: {
  title: string;
  extra?: string;
  file?: DocumentDraft;
}) {
  const progress = file?.progress ?? 0;
  const done = Boolean(file) && progress >= 100;
  return (
    <div
      className={cn(
        "rounded-2xl border bg-white px-4 py-3",
        done ? "border-line" : file ? "border-teal" : "border-line",
      )}
    >
      <div className="flex items-center justify-between gap-3 text-sm">
        <span className="font-medium text-ink">
          {title}
          {extra ? <span className="mr-1 text-muted">{extra}</span> : null}
        </span>
        <span className={cn("flex items-center gap-1 text-xs", done ? "text-mint" : "text-muted")}>
          {done ? (
            <>
              تکمیل شده
              <span className="grid h-4 w-4 place-items-center rounded-full bg-mint text-[10px] text-white">
                ✓
              </span>
            </>
          ) : file ? (
            `در حال آپلود (${toPersianDigits(progress)}٪)`
          ) : (
            "کلیک برای انتخاب فایل"
          )}
        </span>
      </div>
      {file ? (
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-line">
          <div
            className={cn("h-full rounded-full", done ? "bg-mint" : "bg-teal")}
            style={{ width: `${progress}%` }}
          />
        </div>
      ) : null}
    </div>
  );
}

export function DocumentsStep({ draft, errors, onChange, onBack, onNext }: Props) {
  async function handleFile(
    key: "photo" | "nationalIdCard" | "medicalCertificate",
    files: FileList | null,
  ) {
    const file = files?.[0];
    if (!file) return;
    if (!isAllowedDocumentType(file.type)) return;
    if (file.size > MAX_DOCUMENT_BYTES) return;
    const dataUrl = await readFile(file);
    const draftFile: DocumentDraft = {
      fileName: file.name,
      mimeType: file.type,
      sizeBytes: file.size,
      dataUrl,
      progress: 35,
    };
    onChange({ [key]: draftFile });
    window.setTimeout(() => {
      onChange({ [key]: { ...draftFile, progress: 67 } });
    }, 250);
    window.setTimeout(() => {
      onChange({ [key]: { ...draftFile, progress: 100 } });
    }, 700);
  }

  return (
    <div>
      <h1 className="hidden text-xl font-bold text-heading lg:block">بارگذاری مدارک</h1>
      <p className="text-sm leading-8 text-muted lg:mt-2 lg:leading-7">
        جهت تایید نهایی مشخصات در سیستم ملی، تصویر شفاف مدارک زیر را بارگذاری نمایید:
      </p>
      <div className="mt-6 space-y-3">
        <label className="block cursor-pointer">
          <ProgressRow title="عکس پرسنلی" extra="(۳×۴)" file={draft.photo} />
          <input
            type="file"
            className="sr-only"
            accept="image/jpeg,image/png,image/webp,application/pdf"
            onChange={(event) => void handleFile("photo", event.target.files)}
          />
        </label>
        {errors.photo ? <p className="text-xs text-danger">{errors.photo}</p> : null}
        <label className="block cursor-pointer">
          <ProgressRow title="تصویر کارت ملی" file={draft.nationalIdCard} />
          <input
            type="file"
            className="sr-only"
            accept="image/jpeg,image/png,image/webp,application/pdf"
            onChange={(event) => void handleFile("nationalIdCard", event.target.files)}
          />
        </label>
        {errors.nationalIdCard ? (
          <p className="text-xs text-danger">{errors.nationalIdCard}</p>
        ) : null}
        <label className="block cursor-pointer">
          {draft.medicalCertificate ? (
            <ProgressRow title="مدرک تاییدیه سلامت پزشکی" file={draft.medicalCertificate} />
          ) : (
            <div className="rounded-2xl border border-line bg-white px-4 py-3">
              <p className="text-right text-sm font-medium text-ink">مدرک تاییدیه سلامت پزشکی</p>
              <div className="mt-3 rounded-xl border border-dashed border-line px-4 py-5 text-center text-muted">
                <p className="text-xs">کلیک برای انتخاب فایل</p>
                <p className="mt-2 flex items-center justify-center gap-1 text-xs">
                  آپلود فایل جدید
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M12 16V7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                    <path
                      d="M8 10l4-4 4 4"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path d="M5 18h14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                  </svg>
                </p>
              </div>
            </div>
          )}
          <input
            type="file"
            className="sr-only"
            accept="image/jpeg,image/png,image/webp,application/pdf"
            onChange={(event) => void handleFile("medicalCertificate", event.target.files)}
          />
        </label>
      </div>
      <WizardActions onBack={onBack} onNext={onNext} nextLabel="ذخیره و تایید مدارک" />
    </div>
  );
}
