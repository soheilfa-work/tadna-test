import { jsonOk } from "@/src/kernel/http/json";
import { listCounties, listProvinces } from "@/src/modules/geography";

export async function GET(request: Request) {
  const provinceId = new URL(request.url).searchParams.get("provinceId") ?? undefined;
  return jsonOk({
    provinces: listProvinces(),
    counties: listCounties(provinceId),
  });
}
