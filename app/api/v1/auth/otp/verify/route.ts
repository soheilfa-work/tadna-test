import { jsonError, jsonOk } from "@/src/kernel/http/json";
import { AuthError, verifyOtp } from "@/src/modules/identity";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { mobile?: string; code?: string };
    const result = verifyOtp(body.mobile ?? "", body.code ?? "");
    return jsonOk(result);
  } catch (error) {
    if (error instanceof AuthError) return jsonError(error.message, error.status);
    return jsonError("تایید کد ناموفق بود.", 500);
  }
}
