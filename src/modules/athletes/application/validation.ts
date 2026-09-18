import { jalaliMonthLength } from "@/src/shared/lib/jalali";
import { isValidIranianMobile, normalizeMobile } from "@/src/shared/lib/iran-mobile";
import {
  isValidIranianNationalId,
  normalizeNationalId,
} from "@/src/shared/lib/iran-national-id";
import { getClub } from "@/src/modules/clubs";
import { isAllowedDocumentType, MAX_DOCUMENT_BYTES } from "@/src/shared/lib/uploads";
import { getRoleOption } from "@/src/modules/access/domain/roles";
import { TEST_OPEN_AUTH } from "@/src/shared/config/test-flags";
import type { RegisterAthleteInput } from "../domain/types";

export type FieldErrors = Record<string, string>;

function isBirthValid(year: number, month: number, day: number) {
  return (
    year >= 1330 &&
    month >= 1 &&
    month <= 12 &&
    day >= 1 &&
    day <= jalaliMonthLength(year, month)
  );
}

export function validateRegisterAthleteInput(input: RegisterAthleteInput) {
  const firstName = (input.firstName ?? "").trim();
  const lastName = (input.lastName ?? "").trim();
  const club = input.clubId ? getClub(input.clubId) : undefined;

  if (TEST_OPEN_AUTH) {
    const birthValid = isBirthValid(input.birthYear, input.birthMonth, input.birthDay);
    const membershipKind =
      input.membershipKind === "club" && club?.licenseStatus === "active"
        ? "club"
        : "independent";
    return {
      errors: {} as FieldErrors,
      normalized: {
        ...input,
        firstName: firstName || "ورزشکار",
        lastName: lastName || "تست",
        fatherName: input.fatherName?.trim() ?? "",
        nationalId:
          normalizeNationalId(input.nationalId) ||
          input.nationalId.trim() ||
          `test-${Date.now()}`,
        mobile:
          normalizeMobile(input.mobile) ||
          input.mobile.replace(/\D/g, "") ||
          `09${String(Date.now()).slice(-9)}`,
        gender: input.gender === "female" ? "female" : "male",
        birthYear: birthValid ? input.birthYear : 1370,
        birthMonth: birthValid ? input.birthMonth : 1,
        birthDay: birthValid ? input.birthDay : 1,
        roleCode: getRoleOption(input.roleCode)?.code ?? "independent_athlete",
        membershipKind,
        clubId: membershipKind === "club" ? input.clubId : undefined,
        documents: (input.documents ?? []).filter((document) => Boolean(document.dataUrl)),
        provinceId: club?.provinceId ?? "tehran",
        countyId: club?.countyId ?? "tehran-city",
        sportScope: club?.sportScope ?? "functional-fitness",
      },
    };
  }

  const errors: FieldErrors = {};

  if (firstName.length < 2) errors.firstName = "نام را وارد کنید.";
  if (lastName.length < 2) errors.lastName = "نام خانوادگی را وارد کنید.";
  if (!isValidIranianMobile(input.mobile)) {
    errors.mobile = "شماره موبایل معتبر نیست.";
  }
  if (!isValidIranianNationalId(input.nationalId)) {
    errors.nationalId = "کد ملی معتبر نیست.";
  }
  if (input.gender !== "male" && input.gender !== "female") {
    errors.gender = "جنسیت را انتخاب کنید.";
  }
  if (!getRoleOption(input.roleCode)) {
    errors.roleCode = "نقش کاربر را انتخاب کنید.";
  }

  if (!isBirthValid(input.birthYear, input.birthMonth, input.birthDay)) {
    errors.birthDate = "تاریخ تولد را کامل کنید.";
  }

  if (input.membershipKind === "club") {
    if (!club || club.licenseStatus !== "active") {
      errors.clubId = "باشگاه را انتخاب کنید.";
    }
  } else if (input.membershipKind !== "independent") {
    errors.membershipKind = "مسیر عضویت را مشخص کنید.";
  }

  const photo = input.documents.find((doc) => doc.type === "portrait_photo");
  const nationalIdCard = input.documents.find((doc) => doc.type === "national_id_card");
  if (!photo?.dataUrl) errors.photo = "عکس پرسنلی الزامی است.";
  if (!nationalIdCard?.dataUrl) errors.nationalIdCard = "تصویر کارت ملی الزامی است.";

  for (const document of input.documents) {
    if (!isAllowedDocumentType(document.mimeType)) {
      errors.documents = "نوع فایل مجاز نیست.";
    }
    if (document.sizeBytes > MAX_DOCUMENT_BYTES) {
      errors.documents = "حجم فایل بیشتر از ۲ مگابایت است.";
    }
  }

  return {
    errors,
    normalized: {
      ...input,
      firstName,
      lastName,
      fatherName: input.fatherName?.trim() ?? "",
      nationalId: normalizeNationalId(input.nationalId),
      mobile: normalizeMobile(input.mobile),
      provinceId: club?.provinceId ?? "tehran",
      countyId: club?.countyId ?? "tehran-city",
      sportScope: club?.sportScope ?? "functional-fitness",
    },
  };
}
