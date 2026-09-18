import { jsonError, jsonOk } from "@/src/kernel/http/json";
import { getMembershipByTrackingCode, membershipStatusLabel } from "@/src/modules/athletes";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const membership = getMembershipByTrackingCode(id);
  if (!membership) return jsonError("درخواست پیدا نشد.", 404);
  return jsonOk({
    trackingCode: membership.trackingCode,
    kind: membership.kind,
    status: membership.status,
    statusLabel: membershipStatusLabel(membership.status),
    membershipNumber: membership.membershipNumber,
  });
}
