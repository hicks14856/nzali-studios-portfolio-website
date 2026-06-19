import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("X-Frame-Options", "SAMEORIGIN");

  if (request.nextUrl.pathname.startsWith("/_next/image")) {
    response.headers.set("Cache-Control", "private, max-age=31536000, immutable");
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|favicon.ico).*)"],
};
