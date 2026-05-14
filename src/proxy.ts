import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyTokenForPage } from "./utils/verifyToken";

// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {
  // return NextResponse.redirect(new URL('/home', request.url))
  console.log("proxy called");
  // const authToken = request.headers.get("authToken") as string;
  const authToken = request.cookies.get("jwtToken")?.value as string;
  const pathname = request.nextUrl.pathname;

  // =========================
  // حماية الأدمن (إضافة جديدة)
  // =========================
  if (pathname.startsWith("/admin")) {
    if (!authToken) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    const payload = verifyTokenForPage(authToken);

    if (!payload || !payload.isAdmin) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (!authToken) {
    if (request.nextUrl.pathname.startsWith("/api/users/profile")) {
      return NextResponse.json(
        { message: "no token provided , access denied, message from proxy" },
        { status: 401 },
      );
    }
    // Unauthorized
  } else {
    if (
      request.nextUrl.pathname === "/login" ||
      request.nextUrl.pathname === "/register"
    ) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

export const config = {
  matcher: ["/api/users/profile:path*", "/admin/:path*", "/login", "/register"],
};
