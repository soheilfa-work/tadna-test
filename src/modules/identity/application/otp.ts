import { createId, getMemoryStore } from "@/src/kernel/storage/memory-store";
import { normalizeMobile } from "@/src/shared/lib/iran-mobile";
import { TEST_OPEN_AUTH } from "@/src/shared/config/test-flags";

type OtpRecord = {
  id: string;
  mobile: string;
  code: string;
  expiresAt: number;
};

export class AuthError extends Error {
  constructor(
    message: string,
    public status = 400,
  ) {
    super(message);
  }
}

export function requestOtp(mobileInput: string) {
  const mobile = normalizeMobile(mobileInput) || mobileInput.trim() || "test";
  const store = getMemoryStore();
  const record: OtpRecord = {
    id: createId("OTP"),
    mobile,
    code: "open",
    expiresAt: Date.now() + 2 * 60 * 1000,
  };
  store.otps.set(mobile, record);
  return { mobile, expiresInSec: 120, testMode: TEST_OPEN_AUTH };
}

export function verifyOtp(mobileInput: string, code: string) {
  if (TEST_OPEN_AUTH) {
    const mobile = normalizeMobile(mobileInput) || mobileInput.trim() || "test";
    return { mobile, verified: true, testMode: true };
  }

  const mobile = normalizeMobile(mobileInput);
  const store = getMemoryStore();
  const record = store.otps.get(mobile) as OtpRecord | undefined;
  if (!record || record.expiresAt < Date.now()) {
    throw new AuthError("کد تایید منقضی شده است. دوباره ارسال کنید.", 401);
  }
  if (record.code !== code.trim()) {
    throw new AuthError("کد تایید نادرست است.", 401);
  }
  return { mobile, verified: true };
}
