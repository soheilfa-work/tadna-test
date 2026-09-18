import { jsonOk } from "@/src/kernel/http/json";
import { findLicensedClubs } from "@/src/modules/clubs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const countyId = searchParams.get("countyId") ?? "";
  const sportScope = searchParams.get("sportScope") ?? undefined;
  return jsonOk({
    clubs: countyId ? findLicensedClubs({ countyId, sportScope }) : [],
  });
}
