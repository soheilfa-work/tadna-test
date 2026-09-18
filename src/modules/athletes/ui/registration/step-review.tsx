"use client";

import { getClub } from "@/src/modules/clubs";
import { getCounty, getProvince } from "@/src/modules/geography";
import { SPORT_OPTIONS } from "@/src/modules/athletes/domain/types";
import { formatJalali } from "@/src/shared/lib/jalali";
import { maskMobile } from "@/src/shared/lib/iran-mobile";
import { maskNationalId } from "@/src/shared/lib/iran-national-id";
import { isMinor } from "./helpers";
import type { RegistrationDraft } from "./types";

type Props = {
  draft: RegistrationDraft;
  errors: Record<string, string>;
  onChange: (patch: Partial<RegistrationDraft>) => void;
};

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-line/80 py-3 last:border-0">
      <dt className="text-sm text-muted">{label}</dt>
      <dd className="text-sm font-medium text-ink">{value || "—"}</dd>
    </div>
  );
}

export function StepReview({ draft, errors, onChange }: Props) {
  const province = getProvince(draft.provinceId);
  const county = getCounty(draft.countyId);
  const club = draft.clubId ? getClub(draft.clubId) : undefined;
  const sport = SPORT_OPTIONS.find((item) => item.code === draft.sportScope);

  return (
    <div className="space-y-5">
      <dl className="rounded-3xl border border-line bg-white px-4">
        <Row label="نام" value={`${draft.firstName} ${draft.lastName}`} />
        <Row label="نام پدر" value={draft.fatherName} />
        <Row label="کد ملی" value={maskNationalId(draft.nationalId)} />
        <Row label="موبایل" value={maskMobile(draft.mobile)} />
        <Row
          label="تاریخ تولد"
          value={
            draft.birthYear && draft.birthMonth && draft.birthDay
              ? formatJalali(Number(draft.birthYear), Number(draft.birthMonth), Number(draft.birthDay))
              : ""
          }
        />
        <Row label="محل" value={[province?.name, county?.name].filter(Boolean).join("، ")} />
        <Row label="رشته" value={sport?.name ?? ""} />
        <Row
          label="مسیر عضویت"
          value={
            draft.membershipKind === "independent"
              ? "عضویت آزاد، بررسی هیأت"
              : club
                ? `باشگاهی، ${club.name}`
                : ""
          }
        />
        {isMinor(draft) ? <Row label="ولی قانونی" value={draft.guardianName} /> : null}
      </dl>

      <label className="flex items-start gap-3 rounded-2xl bg-sand px-4 py-3 text-sm leading-7 text-ink">
        <input
          type="checkbox"
          className="mt-1 h-4 w-4 accent-ember"
          checked={draft.acceptedPrivacy}
          onChange={(event) => onChange({ acceptedPrivacy: event.target.checked })}
        />
        <span>
          صحت اطلاعات را می‌پذیرم. می‌دانم پرونده اداری از پروفایل عمومی آینده جدا می‌ماند و شماره
          تماس یا کد ملی به‌صورت عمومی نمایش داده نمی‌شود.
        </span>
      </label>
      {errors.acceptedPrivacy ? (
        <p className="text-sm text-danger" role="alert">
          {errors.acceptedPrivacy}
        </p>
      ) : null}
    </div>
  );
}
