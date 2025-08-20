import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;
  console.log("pathname from middleware", pathname)

   const protectedRoutes = ["/" ,"/flights", "/hotels" ];  

   const tokenCookie = request.cookies.get("access_token");
  const token = tokenCookie ? tokenCookie.value : null;

   if (protectedRoutes.some((route) => pathname === route)) {
    if (!token) {
      console.log("⛔ No token found. Redirecting to /login");
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

   if (pathname === "/auth/login" && token) {
    console.log("✅ Already logged in. Redirecting to /");
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/auth/login", "/flights", "/hotels"],
};
