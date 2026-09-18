"use client";

import { Button } from "@/src/shared/ui/button";
import { toPersianDigits } from "@/src/shared/lib/digits";

type Props = {
  firstName: string;
  lastName: string;
  membershipNumber: string;
  issuedAt: string;
};

export function SuccessStep({ firstName, lastName, membershipNumber, issuedAt }: Props) {
  function downloadCard() {
    window.print();
  }

  return (
    <div className="flex flex-1 flex-col items-center text-center">
      <div className="mt-8 grid h-[88px] w-[88px] place-items-center rounded-full bg-[#d8f5e5]">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M5 12.5l5 5 9-10"
            stroke="#2fbf71"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <h1 className="mt-8 text-xl font-bold text-ink">ثبت‌نام با موفقیت انجام شد</h1>
      <p className="mt-3 max-w-sm text-sm leading-8 text-muted">
        اطلاعات شما با موفقیت ثبت گردید و جهت تایید نهایی به فدراسیون و مربی باشگاه ارسال شد.
      </p>
      <div className="relative mt-12 w-full text-sm">
        <svg
          className="absolute left-2 top-0 text-line"
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden
        >
          <path d="M8 4h8v3a4 4 0 0 1-8 0V4Z" stroke="currentColor" strokeWidth="1.3" />
          <path d="M8 5H5.5A2.5 2.5 0 0 0 8 7.5" stroke="currentColor" strokeWidth="1.3" />
          <path d="M16 5h2.5A2.5 2.5 0 0 1 16 7.5" stroke="currentColor" strokeWidth="1.3" />
          <path d="M12 11v3M9 20h6M10 17h4v3h-4v-3Z" stroke="currentColor" strokeWidth="1.3" />
        </svg>
        <p className="font-bold text-heading">کارت عضویت موقت تادنا</p>
        <p className="mt-4 font-medium text-ink">
          {firstName} {lastName}
        </p>
        <p className="mt-1 text-muted">کد عضویت: {toPersianDigits(membershipNumber)}</p>
        <p className="mt-1 text-muted">تاریخ صدور: {issuedAt}</p>
      </div>
      <div className="mt-auto w-full space-y-3 pt-16">
        <Button href="/home" fullWidth className="h-12">
          ورود به صفحه خانه
        </Button>
        <Button variant="outline" fullWidth className="h-12" onClick={downloadCard}>
          دانلود نسخه دیجیتال کارت عضویت
        </Button>
      </div>
    </div>
  );
}
