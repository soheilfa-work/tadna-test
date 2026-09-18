"use client";

import { getClub } from "@/src/modules/clubs";
import { getRoleOption } from "@/src/modules/access/domain/roles";
import { Button } from "@/src/shared/ui/button";
import { toPersianDigits } from "@/src/shared/lib/digits";
import type { OnboardingDraft } from "./types";

type Props = {
  draft: OnboardingDraft;
  submitting?: boolean;
  error?: string;
  onSubmit: () => void;
};

function Block({
  title,
  rows,
}: {
  title: string;
  rows: Array<{ label: string; value: string; ok?: boolean }>;
}) {
  return (
    <div className="rounded-2xl border border-line bg-white px-4 py-4">
      <p className="mb-3 text-sm font-bold text-heading">{title}</p>
      <dl className="space-y-2.5">
        {rows.map((row) => (
          <div key={row.label} className="flex items-start justify-between gap-4 text-sm">
            <dt className="text-muted">{row.label}</dt>
            <dd className={row.ok ? "flex items-center gap-1 text-mint" : "font-medium text-ink"}>
              {row.ok ? <span className="text-xs">✓</span> : null}
              {row.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function ReviewStep({ draft, submitting, error, onSubmit }: Props) {
  const role = getRoleOption(draft.roleCode);
  const club = draft.clubId ? getClub(draft.clubId) : undefined;
  const clubSelected = Boolean(draft.clubId && !draft.independent);

  return (
    <div>
      <h1 className="hidden text-xl font-bold text-heading lg:block">مرور مشخصات</h1>
      <p className="text-sm leading-8 text-muted lg:mt-2 lg:leading-7">
        لطفا تمامی مشخصات زیر را با دقت بررسی و در صورت نیاز ویرایش نمایید:
      </p>
      <div className="mt-6 space-y-3">
        <Block
          title="مشخصات فردی"
          rows={[
            { label: "نام و نام‌خانوادگی:", value: `${draft.firstName} ${draft.lastName}`.trim() || "—" },
            { label: "کد ملی:", value: toPersianDigits(draft.nationalId) || "—" },
            { label: "تاریخ تولد:", value: toPersianDigits(draft.birthDate) || "—" },
          ]}
        />
        <Block
          title="اطلاعات ورزشی و باشگاه"
          rows={[
            {
              label: "نقش انتخابی:",
              value: clubSelected ? "ورزشکار باشگاهی" : (role?.title ?? "—"),
            },
            {
              label: "نام باشگاه تاییدشده:",
              value: clubSelected ? (club?.name ?? "—") : "ورزشکار آزاد",
            },
          ]}
        />
        <Block
          title="وضعیت مدارک ارسالی"
          rows={[
            {
              label: "عکس پرسنلی:",
              value: draft.photo ? "بارگذاری شد" : "ناقص",
              ok: Boolean(draft.photo),
            },
            {
              label: "تصویر کارت ملی:",
              value: draft.nationalIdCard ? "بارگذاری شد" : "ناقص",
              ok: Boolean(draft.nationalIdCard),
            },
          ]}
        />
      </div>
      {error ? <p className="mt-3 text-sm text-danger">{error}</p> : null}
      <div className="mt-8">
        <Button fullWidth className="h-12" disabled={submitting} onClick={onSubmit}>
          {submitting ? "در حال ثبت..." : "تایید و ثبت نهایی اطلاعات"}
        </Button>
      </div>
    </div>
  );
}
