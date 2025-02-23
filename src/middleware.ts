import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { routing } from "@/i18n/routing";

import { PUBLIC_ROUTES } from "@/constants";

import createMiddleware from "next-intl/middleware";

const localizationMiddleware = createMiddleware(routing);

async function authMiddleware(
  req: NextRequest,
  token: any
): Promise<NextResponse | void> {
  const pathname = req.nextUrl.pathname;
  const isPublicRoute = PUBLIC_ROUTES.some((route) => pathname === route);

  const redirectUrl = req.nextUrl.clone();

  if (pathname === "/") {
    redirectUrl.pathname = "/en";
    return NextResponse.redirect(redirectUrl);
  }

  if (!token && !isPublicRoute) {
    const locale = pathname.startsWith("/en")
      ? "/en"
      : pathname.startsWith("/uk")
      ? "/uk"
      : pathname.startsWith("/de")
      ? "de"
      : "/fr";

    redirectUrl.pathname = locale;

    return NextResponse.redirect(redirectUrl);
  }

  return;
}

export default async function middleware(req: NextRequest) {
  const token = await getToken({ req });

  const authResponse = await authMiddleware(req, token);
  if (authResponse) {
    return authResponse;
  }

  return localizationMiddleware(req);
}

export const config = {
  matcher: ["/(uk|en|de|fr)/:path*", "/"],
};
