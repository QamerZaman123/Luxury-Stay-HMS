export function notConnected() {
  return Promise.resolve({ ok: false, message: "API not connected" });
}
