export function normalizeEmail(email: string | null | undefined) {
  return email?.trim().toLowerCase() ?? null;
}

const DEFAULT_ADMIN_EMAILS = ["dierahodzaeva28@gmail.com"];

function readAdminEmailsFromEnv(): string[] {
  const raw =
    process.env.ADMIN_EMAILS ??
    process.env.ADMIN_EMAIL;
  if (!raw) return DEFAULT_ADMIN_EMAILS;

  // Accept comma/space separated emails.
  return raw
    .split(/[,\s]+/g)
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminEmail(email: string | null | undefined) {
  const normalized = normalizeEmail(email);
  if (!normalized) return false;
  const allowed = readAdminEmailsFromEnv();
  return allowed.includes(normalized);
}
