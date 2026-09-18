"use client";

import { findLicensedClubs } from "@/src/modules/clubs";
import { cn } from "@/src/shared/lib/cn";
import type { RegistrationDraft } from "./types";

type Props = {
  draft: RegistrationDraft;
  errors: Record<string, string>;
  onChange: (patch: Partial<RegistrationDraft>) => void;
};

export function StepClub({ draft, errors, onChange }: Props) {
  const clubs = draft.countyId
    ? findLicensedClubs({ countyId: draft.countyId, sportScope: draft.sportScope })
    : [];
  const independentAllowed = Boolean(draft.countyId) && clubs.length === 0;

  return (
    <div className="space-y-4">
      {draft.countyId && clubs.length > 0 ? (
        <>
          <p className="text-sm leading-7 text-muted">
            در این شهرستان باشگاه مجاز وجود دارد. عضویت باشگاهی را انتخاب کنید. مسیر ورزشکار آزاد
            فقط برای شهر بدون باشگاه مجاز فعال می‌شود.
          </p>
          <div className="grid gap-3">
            {clubs.map((club) => {
              const selected = draft.clubId === club.id;
              return (
                <button
                  key={club.id}
                  type="button"
                  onClick={() =>
                    onChange({ clubId: club.id, membershipKind: "club" })
                  }
                  className={cn(
                    "rounded-2xl border bg-white p-4 text-right transition-colors",
                    selected
                      ? "border-ember ring-4 ring-ember/10"
                      : "border-line hover:border-ember/40",
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-ink">{club.name}</p>
                      <p className="mt-1 text-xs text-muted">مدیر: {club.managerName}</p>
                    </div>
                    <span className="rounded-full bg-success/10 px-3 py-1 text-[11px] font-medium text-success">
                      مجوز فعال
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </>
      ) : null}

      {independentAllowed ? (
        <button
          type="button"
          onClick={() => onChange({ membershipKind: "independent", clubId: "" })}
          className={cn(
            "w-full rounded-2xl border bg-white p-5 text-right",
            draft.membershipKind === "independent"
              ? "border-ember ring-4 ring-ember/10"
              : "border-line hover:border-ember/40",
          )}
        >
          <p className="font-semibold text-ink">درخواست عضویت آزاد</p>
          <p className="mt-2 text-sm leading-7 text-muted">
            در این شهرستان باشگاه مجاز ثبت نشده است. پرونده برای بررسی مدت‌دار به هیأت شهرستان یا
            استان ارجاع می‌شود.
          </p>
        </button>
      ) : null}

      {!draft.countyId ? (
        <p className="rounded-2xl bg-sand px-4 py-3 text-sm text-muted">
          ابتدا استان و شهرستان را انتخاب کنید.
        </p>
      ) : null}

      {errors.membershipKind || errors.clubId ? (
        <p className="text-sm text-danger" role="alert">
          {errors.membershipKind || errors.clubId}
        </p>
      ) : null}
    </div>
  );
}
