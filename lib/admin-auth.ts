export const ADMIN_LOGIN = "admin";
export const ADMIN_PASSWORD = "admin";
export const ADMIN_SESSION_COOKIE = "admin_session";
export const ADMIN_SESSION_VALUE = "authenticated";

export function isValidAdminCredentials(login: string, password: string) {
  return login === ADMIN_LOGIN && password === ADMIN_PASSWORD;
}

export function isAuthenticatedAdmin(sessionValue?: string) {
  return sessionValue === ADMIN_SESSION_VALUE;
}
