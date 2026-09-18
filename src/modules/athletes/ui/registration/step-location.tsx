"use client";

import { listCounties, listProvinces } from "@/src/modules/geography";
import { SPORT_OPTIONS } from "@/src/modules/athletes/domain/types";
import { SelectField } from "@/src/shared/ui/select-field";
import type { RegistrationDraft } from "./types";

type Props = {
  draft: RegistrationDraft;
  errors: Record<string, string>;
  onChange: (patch: Partial<RegistrationDraft>) => void;
};

export function StepLocation({ draft, errors, onChange }: Props) {
  const counties = listCounties(draft.provinceId);

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <SelectField
        id="province"
        label="استان"
        required
        value={draft.provinceId}
        error={errors.provinceId}
        onChange={(value) =>
          onChange({
            provinceId: value,
            countyId: "",
            clubId: "",
            membershipKind: "",
          })
        }
        options={listProvinces().map((item) => ({ value: item.id, label: item.name }))}
      />
      <SelectField
        id="county"
        label="شهرستان"
        required
        disabled={!draft.provinceId}
        value={draft.countyId}
        error={errors.countyId}
        onChange={(value) =>
          onChange({
            countyId: value,
            clubId: "",
            membershipKind: "",
          })
        }
        options={counties.map((item) => ({ value: item.id, label: item.name }))}
      />
      <SelectField
        id="sport"
        label="رشته ورزشی"
        required
        className="sm:col-span-2"
        value={draft.sportScope}
        error={errors.sportScope}
        onChange={(value) =>
          onChange({
            sportScope: value,
            clubId: "",
            membershipKind: "",
          })
        }
        options={SPORT_OPTIONS.map((item) => ({ value: item.code, label: item.name }))}
      />
      <p className="sm:col-span-2 rounded-2xl bg-sand px-4 py-3 text-sm leading-7 text-muted">
        پایلوت فعلی روی فانکشنال فیتنس است، اما مدل داده به این رشته قفل نمی‌شود. پس از انتخاب
        شهرستان، سامانه وجود باشگاه مجاز را بررسی می‌کند.
      </p>
    </div>
  );
}
