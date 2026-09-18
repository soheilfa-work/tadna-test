export function jsonError(message: string, status = 400, extras?: Record<string, unknown>) {
  return Response.json({ ok: false, message, ...extras }, { status });
}

export function jsonOk<T>(data: T, status = 200) {
  return Response.json({ ok: true, data }, { status });
}
