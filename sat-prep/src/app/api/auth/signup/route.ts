import type { NextRequest } from "next/server";
import { hash } from "bcryptjs";

import prisma from "@/lib/prisma";
import {
  enforceRateLimit,
  ensureSameOrigin,
  jsonWithSecurityHeaders,
} from "@/lib/security";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const originResponse = ensureSameOrigin(req);
    if (originResponse) {
      return originResponse;
    }

    const rateLimitResponse = enforceRateLimit(req, {
      bucket: "signup",
      max: 10,
      windowMs: 10 * 60_000,
    });
    if (rateLimitResponse) {
      return rateLimitResponse;
    }

    const body = (await req.json()) as {
      email?: string;
      password?: string;
    };

    const email = body.email?.trim().toLowerCase();
    const password = body.password;

    if (!email || !password) {
      return jsonWithSecurityHeaders(
        { error: "Email and password are required." },
        400
      );
    }

    if (!EMAIL_REGEX.test(email) || email.length > 320) {
      return jsonWithSecurityHeaders({ error: "Invalid email address." }, 400);
    }

    if (password.length < 8 || password.length > 72) {
      return jsonWithSecurityHeaders(
        { error: "Password must be between 8 and 72 characters." },
        400
      );
    }

    const passwordHash = await hash(password, 10);

    try {
      const user = await prisma.user.create({
        data: {
          email,
          password: passwordHash,
        },
        select: { id: true, email: true },
      });

      return jsonWithSecurityHeaders({ user }, 201);
    } catch (err: any) {
      // Prisma sqlite unique constraint error message differs across providers.
      if (typeof err?.message === "string" && err.message.toLowerCase().includes("unique")) {
        return jsonWithSecurityHeaders(
          { error: "Email is already in use." },
          409
        );
      }
      throw err;
    }
  } catch (err: any) {
    return jsonWithSecurityHeaders(
      { error: err?.message ?? "Signup failed." },
      500
    );
  }
}
