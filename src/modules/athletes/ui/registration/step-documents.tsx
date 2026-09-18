"use client";

import { Field, inputClassName } from "@/src/shared/ui/field";
import { FileDrop } from "@/src/shared/ui/file-drop";
import { onlyDigits } from "@/src/shared/lib/digits";
import { isMinor } from "./helpers";
import type { RegistrationDraft } from "./types";

type Props = {
  draft: RegistrationDraft;
  errors: Record<string, string>;
  onChange: (patch: Partial<RegistrationDraft>) => void;
};

export function StepDocuments({ draft, errors, onChange }: Props) {
  const minor = isMinor(draft);

  return (
    <div className="space-y-6">
      <FileDrop
        id="nationalIdCard"
        label="تصویر کارت ملی"
        valueName={draft.nationalIdCard?.fileName}
        previewUrl={draft.nationalIdCard?.dataUrl}
        error={errors.nationalIdCard}
        onFile={(file, dataUrl) =>
          onChange({
            nationalIdCard: dataUrl
              ? {
                  fileName: file.name,
                  mimeType: file.type,
                  sizeBytes: file.size,
                  dataUrl,
                }
              : undefined,
          })
        }
        onClear={() => onChange({ nationalIdCard: undefined })}
      />

      {minor ? (
        <div className="space-y-4 rounded-3xl border border-line bg-sand/70 p-4">
          <div>
            <p className="font-semibold text-ink">رضایت ولی قانونی</p>
            <p className="mt-1 text-sm leading-7 text-muted">
              برای افراد زیر ۱۸ سال، عضویت نهایی بدون رضایت ثبت‌شده ولی قانونی صادر نمی‌شود.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="نام ولی" htmlFor="guardianName" required error={errors.guardianName}>
              <input
                id="guardianName"
                className={inputClassName}
                value={draft.guardianName}
                onChange={(event) => onChange({ guardianName: event.target.value })}
              />
            </Field>
            <Field
              label="کد ملی ولی"
              htmlFor="guardianNationalId"
              required
              error={errors.guardianNationalId}
            >
              <input
                id="guardianNationalId"
                className={inputClassName}
                inputMode="numeric"
                maxLength={10}
                value={draft.guardianNationalId}
                onChange={(event) =>
                  onChange({ guardianNationalId: onlyDigits(event.target.value, 10) })
                }
              />
            </Field>
            <Field
              label="موبایل ولی"
              htmlFor="guardianMobile"
              required
              error={errors.guardianMobile}
              className="sm:col-span-2"
            >
              <input
                id="guardianMobile"
                className={inputClassName}
                inputMode="numeric"
                maxLength={11}
                value={draft.guardianMobile}
                onChange={(event) =>
                  onChange({ guardianMobile: onlyDigits(event.target.value, 11) })
                }
              />
            </Field>
          </div>
          <FileDrop
            id="guardianConsent"
            label="فایل رضایت‌نامه"
            valueName={draft.guardianConsent?.fileName}
            previewUrl={draft.guardianConsent?.dataUrl}
            error={errors.guardianConsent}
            onFile={(file, dataUrl) =>
              onChange({
                guardianConsent: dataUrl
                  ? {
                      fileName: file.name,
                      mimeType: file.type,
                      sizeBytes: file.size,
                      dataUrl,
                    }
                  : undefined,
              })
            }
            onClear={() => onChange({ guardianConsent: undefined })}
          />
        </div>
      ) : (
        <p className="rounded-2xl bg-sand px-4 py-3 text-sm leading-7 text-muted">
          پرونده پزشکی تفصیلی در این فاز ساخته نمی‌شود. فقط مدارک پایه هویتی دریافت می‌گردد.
        </p>
      )}
    </div>
  );
}
