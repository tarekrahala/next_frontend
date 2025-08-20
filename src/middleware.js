import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;
  console.log("pathname from middleware", pathname)

  // المسارات المحمية
  const protectedRoutes = ["/" ,"/flights", "/hotels" ]; // خلي بالك، هنا ضفنا / برضه

  // جيب الكوكي
  const tokenCookie = request.cookies.get("access_token");
  const token = tokenCookie ? tokenCookie.value : null;

  // لو المستخدم بيحاول يدخل صفحة محمية من غير توكن
  if (protectedRoutes.some((route) => pathname === route)) {
    if (!token) {
      console.log("⛔ No token found. Redirecting to /login");
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // لو المستخدم عنده توكن لكن واقف على /login → وده مش منطقي
  if (pathname === "/login" && token) {
    console.log("✅ Already logged in. Redirecting to /");
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/flights", "/hotels"],
};
