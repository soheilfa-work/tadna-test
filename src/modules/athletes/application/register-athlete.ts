import { createId, getMemoryStore } from "@/src/kernel/storage/memory-store";
import { writeAuditLog } from "@/src/modules/audit";
import { maskMobile } from "@/src/shared/lib/iran-mobile";
import { maskNationalId } from "@/src/shared/lib/iran-national-id";
import { gregorianIsoFromJalali } from "@/src/shared/lib/jalali";
import { TEST_OPEN_AUTH } from "@/src/shared/config/test-flags";
import type { Person, UserAccount } from "@/src/modules/identity";
import type { DocumentRecord } from "@/src/modules/documents";
import { initialMembershipStatus } from "../domain/membership-machine";
import type {
  AthleteProfile,
  Membership,
  RegisterAthleteInput,
} from "../domain/types";
import { validateRegisterAthleteInput } from "./validation";

export class RegisterAthleteError extends Error {
  constructor(
    message: string,
    public status: number,
    public fields?: Record<string, string>,
  ) {
    super(message);
  }
}

function nextMembershipNumber() {
  const n = Math.floor(100000 + Math.random() * 900000);
  return `TAD-${n}`;
}

export function registerAthlete(input: RegisterAthleteInput) {
  const { errors, normalized } = validateRegisterAthleteInput(input);
  if (!TEST_OPEN_AUTH && Object.keys(errors).length > 0) {
    throw new RegisterAthleteError("اطلاعات ثبت‌نام ناقص یا نامعتبر است.", 422, errors);
  }

  const gender = normalized.gender === "female" ? "female" : "male";
  const membershipKind = normalized.membershipKind === "club" ? "club" : "independent";

  const store = getMemoryStore();
  if (!TEST_OPEN_AUTH) {
    const existingPerson = [...store.persons.values()].find((item) => {
      const person = item as Person;
      return person.nationalId === normalized.nationalId && !person.archivedAt;
    });
    if (existingPerson) {
      throw new RegisterAthleteError("برای این کد ملی پرونده فعال وجود دارد.", 409, {
        nationalId: "این کد ملی قبلاً ثبت شده است.",
      });
    }

    const existingUser = [...store.users.values()].find((item) => {
      const user = item as UserAccount;
      return user.mobile === normalized.mobile;
    });
    if (existingUser) {
      throw new RegisterAthleteError("این شماره موبایل قبلاً ثبت شده است.", 409, {
        mobile: "این شماره موبایل قبلاً ثبت شده است.",
      });
    }
  }

  const now = new Date().toISOString();
  const person: Person = {
    id: createId("PRSN"),
    firstName: normalized.firstName,
    lastName: normalized.lastName,
    fatherName: normalized.fatherName,
    nationalId: normalized.nationalId,
    birthDate: gregorianIsoFromJalali(
      normalized.birthYear,
      normalized.birthMonth,
      normalized.birthDay,
    ),
    gender,
    mobile: normalized.mobile,
    createdAt: now,
    archivedAt: null,
  };

  const user: UserAccount = {
    id: createId("USR"),
    personId: person.id,
    mobile: normalized.mobile,
    roleCode: normalized.roleCode,
    status: "active",
    createdAt: now,
  };

  const profile: AthleteProfile = {
    id: createId("ATH"),
    personId: person.id,
    sportScope: normalized.sportScope,
    provinceId: normalized.provinceId,
    countyId: normalized.countyId,
    createdAt: now,
  };

  const membership: Membership = {
    id: createId("MEM"),
    trackingCode: createId("REQ"),
    athleteProfileId: profile.id,
    kind: membershipKind,
    status: initialMembershipStatus(membershipKind),
    organizationId: normalized.clubId ?? null,
    clubId: normalized.clubId ?? null,
    sportScope: normalized.sportScope,
    provinceId: normalized.provinceId,
    countyId: normalized.countyId,
    membershipNumber: nextMembershipNumber(),
    startsAt: now,
    endsAt: null,
    createdAt: now,
  };

  store.persons.set(person.id, person);
  store.users.set(user.id, user);
  store.athleteProfiles.set(profile.id, profile);
  store.memberships.set(membership.id, membership);

  for (const document of normalized.documents) {
    const record: DocumentRecord = {
      id: createId("DOC"),
      ownerPersonId: person.id,
      type: document.type,
      fileName: document.fileName,
      mimeType: document.mimeType,
      sizeBytes: document.sizeBytes,
      storageKey: document.dataUrl.slice(0, 48) || createId("FILE"),
      status: "uploaded",
      createdAt: now,
    };
    store.documents.set(record.id, record);
  }

  writeAuditLog({
    actorId: user.id,
    action: "athlete.register",
    entityType: "membership",
    entityId: membership.id,
    result: "success",
    metadata: {
      kind: membership.kind,
      nationalId: maskNationalId(person.nationalId),
      mobile: maskMobile(person.mobile),
      countyId: membership.countyId,
    },
  });

  return {
    trackingCode: membership.trackingCode,
    membershipId: membership.id,
    membershipNumber: membership.membershipNumber,
    status: membership.status,
    kind: membership.kind,
    firstName: person.firstName,
    lastName: person.lastName,
  };
}

export function getMembershipByTrackingCode(trackingCode: string) {
  const store = getMemoryStore();
  return [...store.memberships.values()].find((item) => {
    const membership = item as Membership;
    return membership.trackingCode === trackingCode;
  }) as Membership | undefined;
}
