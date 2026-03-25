export function normalizeEmail(email: string | null | undefined) {
  return email?.trim().toLowerCase() ?? null;
}

function readAdminEmailsFromEnv(): string[] {
  const raw =
    process.env.NEXT_PUBLIC_ADMIN_EMAILS ??
    process.env.ADMIN_EMAILS ??
    process.env.NEXT_PUBLIC_ADMIN_EMAIL ??
    process.env.ADMIN_EMAIL;
  if (!raw) return [];

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

