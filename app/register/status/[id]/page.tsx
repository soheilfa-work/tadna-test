import { getClub } from "@/src/modules/clubs";
import { getCounty, getProvince } from "@/src/modules/geography";
import {
  getMembershipByTrackingCode,
  membershipStatusLabel,
} from "@/src/modules/athletes";
import { BrandMark } from "@/src/shared/ui/brand-mark";
import { Button } from "@/src/shared/ui/button";
import { toPersianDigits } from "@/src/shared/lib/digits";

export default async function RegistrationStatusPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const membership = getMembershipByTrackingCode(id);
  const province = membership ? getProvince(membership.provinceId) : undefined;
  const county = membership ? getCounty(membership.countyId) : undefined;
  const club = membership?.clubId ? getClub(membership.clubId) : undefined;

  return (
    <div className="min-h-dvh bg-sand px-4 py-8">
      <div className="mx-auto w-full max-w-xl">
        <BrandMark />
        <section className="mt-8 rounded-[28px] border border-line bg-white p-6 shadow-[0_18px_50px_rgba(11,31,51,0.06)]">
          {membership ? (
            <>
              <p className="text-sm text-success">درخواست ثبت شد</p>
              <h1 className="mt-2 text-2xl font-extrabold text-ink">پیگیری پرونده ورزشکار</h1>
              <p className="mt-4 rounded-2xl bg-sand px-4 py-3 text-sm text-ink">
                کد پیگیری:{" "}
                <span className="font-bold">{toPersianDigits(membership.trackingCode)}</span>
              </p>
              <dl className="mt-5 space-y-3 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-muted">وضعیت</dt>
                  <dd className="font-medium">{membershipStatusLabel(membership.status)}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted">مسیر</dt>
                  <dd>{membership.kind === "independent" ? "عضویت آزاد" : "عضویت باشگاهی"}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted">محل</dt>
                  <dd>{[province?.name, county?.name].filter(Boolean).join("، ")}</dd>
                </div>
                {club ? (
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted">باشگاه</dt>
                    <dd>{club.name}</dd>
                  </div>
                ) : null}
              </dl>
              <p className="mt-5 text-sm leading-7 text-muted">
                شماره عضویت یکتا پس از تأیید مرجع مجاز صادر می‌شود. کد ملی و موبایل در این صفحه نمایش
                داده نمی‌شود.
              </p>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-extrabold text-ink">درخواست پیدا نشد</h1>
              <p className="mt-3 text-sm leading-7 text-muted">
                کد پیگیری نامعتبر است یا این نشست سرور بازنشانی شده است.
              </p>
            </>
          )}
          <div className="mt-6">
            <Button href="/onboarding" variant="outline" fullWidth>
              ثبت‌نام جدید
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
