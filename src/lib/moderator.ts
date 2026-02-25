// Moderator role management using localStorage
// The moderator password is stored as an environment variable or hardcoded for demo purposes.
// In production, this would use a proper auth system.

export const MODERATOR_PASSWORD = "wildworld-mod-2024";

export function isModerator(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("wildworld_role") === "moderator";
}

export function loginAsModerator(password: string): boolean {
  if (password === MODERATOR_PASSWORD) {
    localStorage.setItem("wildworld_role", "moderator");
    return true;
  }
  return false;
}

export function logoutModerator(): void {
  localStorage.removeItem("wildworld_role");
}
