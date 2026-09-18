import { jsonError, jsonOk } from "@/src/kernel/http/json";
import { AuthError, requestOtp } from "@/src/modules/identity";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { mobile?: string };
    const result = requestOtp(body.mobile ?? "");
    return jsonOk(result);
  } catch (error) {
    if (error instanceof AuthError) return jsonError(error.message, error.status);
    return jsonError("ارسال کد ناموفق بود.", 500);
  }
}
