"use client";

import { Field, inputClassName } from "@/src/shared/ui/field";
import { FileDrop } from "@/src/shared/ui/file-drop";
import { SelectField } from "@/src/shared/ui/select-field";
import { onlyDigits } from "@/src/shared/lib/digits";
import { JALALI_MONTHS, jalaliMonthLength, jalaliYearOptions } from "@/src/shared/lib/jalali";
import type { RegistrationDraft } from "./types";

type Props = {
  draft: RegistrationDraft;
  errors: Record<string, string>;
  onChange: (patch: Partial<RegistrationDraft>) => void;
};

export function StepIdentity({ draft, errors, onChange }: Props) {
  const year = Number(draft.birthYear) || jalaliYearOptions()[0];
  const month = Number(draft.birthMonth) || 1;
  const days = Array.from({ length: jalaliMonthLength(year, month) }, (_, index) => index + 1);

  return (
    <div className="grid gap-6 lg:grid-cols-[180px_minmax(0,1fr)]">
      <FileDrop
        id="photo"
        label="عکس پرسنلی"
        hint="زمینه روشن، تمام‌رخ"
        portrait
        valueName={draft.photo?.fileName}
        previewUrl={draft.photo?.dataUrl}
        error={errors.photo}
        onFile={(file, dataUrl) =>
          onChange({
            photo: dataUrl
              ? {
                  fileName: file.name,
                  mimeType: file.type,
                  sizeBytes: file.size,
                  dataUrl,
                }
              : undefined,
          })
        }
        onClear={() => onChange({ photo: undefined })}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="نام" htmlFor="firstName" required error={errors.firstName}>
          <input
            id="firstName"
            className={inputClassName}
            value={draft.firstName}
            autoComplete="given-name"
            onChange={(event) => onChange({ firstName: event.target.value })}
          />
        </Field>
        <Field label="نام خانوادگی" htmlFor="lastName" required error={errors.lastName}>
          <input
            id="lastName"
            className={inputClassName}
            value={draft.lastName}
            autoComplete="family-name"
            onChange={(event) => onChange({ lastName: event.target.value })}
          />
        </Field>
        <Field label="نام پدر" htmlFor="fatherName" required error={errors.fatherName}>
          <input
            id="fatherName"
            className={inputClassName}
            value={draft.fatherName}
            onChange={(event) => onChange({ fatherName: event.target.value })}
          />
        </Field>
        <Field
          label="کد ملی"
          htmlFor="nationalId"
          required
          error={errors.nationalId}
          hint="ده رقم، بدون خط تیره"
        >
          <input
            id="nationalId"
            className={inputClassName}
            inputMode="numeric"
            maxLength={10}
            value={draft.nationalId}
            onChange={(event) => onChange({ nationalId: onlyDigits(event.target.value, 10) })}
          />
        </Field>
        <Field
          label="شماره موبایل"
          htmlFor="mobile"
          required
          error={errors.mobile}
          hint="ورود بعدی با همین شماره و رمز یک‌بارمصرف خواهد بود"
        >
          <input
            id="mobile"
            className={inputClassName}
            inputMode="numeric"
            maxLength={11}
            placeholder="09xxxxxxxxx"
            value={draft.mobile}
            onChange={(event) => onChange({ mobile: onlyDigits(event.target.value, 11) })}
          />
        </Field>
        <SelectField
          id="gender"
          label="جنسیت"
          required
          value={draft.gender}
          error={errors.gender}
          onChange={(value) => onChange({ gender: value as RegistrationDraft["gender"] })}
          options={[
            { value: "male", label: "مرد" },
            { value: "female", label: "زن" },
          ]}
        />
        <SelectField
          id="birthYear"
          label="سال تولد"
          required
          value={draft.birthYear}
          error={errors.birthDate}
          onChange={(value) => onChange({ birthYear: value, birthDay: "" })}
          options={jalaliYearOptions().map((item) => ({
            value: String(item),
            label: String(item),
          }))}
        />
        <SelectField
          id="birthMonth"
          label="ماه تولد"
          required
          value={draft.birthMonth}
          onChange={(value) => onChange({ birthMonth: value, birthDay: "" })}
          options={JALALI_MONTHS.map((item, index) => ({
            value: String(index + 1),
            label: item,
          }))}
        />
        <SelectField
          id="birthDay"
          label="روز تولد"
          required
          className="sm:col-span-2 lg:col-span-1"
          value={draft.birthDay}
          onChange={(value) => onChange({ birthDay: value })}
          options={days.map((item) => ({ value: String(item), label: String(item) }))}
        />
      </div>
    </div>
  );
}
