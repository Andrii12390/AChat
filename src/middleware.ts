import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const localizationMiddleware = createMiddleware(routing);

export default async function middleware(req: any) {
  const res = await localizationMiddleware(req);

  const token = await getToken({ req });
  const publicRoutes = ["/en", "/uk", "/en/registration", "/uk/registration"];
  if (!token && !publicRoutes.some((route) => req.nextUrl.pathname === route)) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = "/en";
    return NextResponse.redirect(redirectUrl);
  }

  return res;
}

export const config = {
  matcher: ["/(uk|en)/:path*", "/"],
};
