import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

import { isAdminEmail } from "@/lib/admin";
import { applySecurityHeaders } from "@/lib/security";

function redirectToLogin(req: NextRequest) {
  const loginUrl = new URL("/login", req.url);
  loginUrl.searchParams.set(
    "callbackUrl",
    `${req.nextUrl.pathname}${req.nextUrl.search}`
  );

  return NextResponse.redirect(loginUrl);
}

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const needsUserAuth =
    pathname.startsWith("/practice") || pathname.startsWith("/stats");
  const needsAdminAuth =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/api/admin") ||
    pathname.startsWith("/api/seed");

  let response = NextResponse.next();

  if (needsUserAuth || needsAdminAuth) {
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET ?? process.env.AUTH_SECRET,
    });

    if (!token) {
      response = pathname.startsWith("/api/")
        ? NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        : redirectToLogin(req);
      return applySecurityHeaders(response);
    }

    if (needsAdminAuth && !isAdminEmail(token.email)) {
      response = pathname.startsWith("/api/")
        ? NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        : NextResponse.redirect(new URL("/", req.url));
      return applySecurityHeaders(response);
    }
  }

  return applySecurityHeaders(response);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
