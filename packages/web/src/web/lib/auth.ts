import { createAuthClient } from "better-auth/react";
const KEY = "trajectory-admin-token";
export const getToken = () => localStorage.getItem(KEY) || "";
export function captureToken(ctx: { response: Response }) {
  const token = ctx.response.headers.get("set-auth-token");
  if (token) localStorage.setItem(KEY, token);
}
export function clearToken() {
  localStorage.removeItem(KEY);
}
export const authClient = createAuthClient({
  baseURL: window.location.origin,
  basePath: "/api/auth",
  fetchOptions: { credentials: "omit", auth: { type: "Bearer", token: getToken } },
});
