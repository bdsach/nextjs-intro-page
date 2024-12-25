import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const introPageCookie = request.cookies.get("visit_intro_page");

  // check if not have cookies and not visit intro page, check page because handle for redirected you too many times
  if (!introPageCookie && request.nextUrl.pathname !== "/intro") {
    return NextResponse.redirect(new URL("/intro", request.url));
  }

  // when visit intro page, set cookies
  if (request.nextUrl.pathname === "/intro") {
    const response = NextResponse.next();
    response.cookies.set("visit_intro_page", "true", {
      maxAge: 60 * 60 * 24 * 1,
    });
    return response;
  }

  // when visit root page, redirect to home
  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/home", request.url));
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
