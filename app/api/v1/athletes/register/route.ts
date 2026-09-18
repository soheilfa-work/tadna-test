import { jsonError, jsonOk } from "@/src/kernel/http/json";
import {
  registerAthlete,
  RegisterAthleteError,
} from "@/src/modules/athletes";
import type { RegisterAthleteInput } from "@/src/modules/athletes/domain/types";

export async function POST(request: Request) {
  let body: RegisterAthleteInput;
  try {
    body = (await request.json()) as RegisterAthleteInput;
  } catch {
    return jsonError("بدنه درخواست نامعتبر است.");
  }

  try {
    const result = registerAthlete(body);
    return jsonOk(result, 201);
  } catch (error) {
    if (error instanceof RegisterAthleteError) {
      return jsonError(error.message, error.status, { fields: error.fields });
    }
    return jsonError("خطای داخلی در ثبت درخواست.", 500);
  }
}
