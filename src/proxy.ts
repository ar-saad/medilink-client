import { NextRequest, NextResponse } from "next/server";
import { jwtUtils } from "./lib/jwtUtils";
import {
  getDefaultDashboardRoute,
  getRouteOwner,
  isAuthRoute,
  UserRole,
} from "./lib/authUtils";
import {
  getNewTokensWithRefreshToken,
  getUserInfo,
} from "./services/auth.services";
import { isTokenExpiringSoon } from "./lib/tokenUtils";

async function refreshTokenMiddleware(refreshToken: string): Promise<boolean> {
  try {
    const refresh = await getNewTokensWithRefreshToken(refreshToken);

    if (!refresh) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
}

export async function proxy(request: NextRequest) {
  try {
    const { pathname } = request.nextUrl;
    const accessToken = request.cookies.get("accessToken")?.value;
    const refreshToken = request.cookies.get("refreshToken")?.value;

    const decodedAccessToken =
      accessToken &&
      jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_SECRET!).data;

    const isValidAccessToken =
      accessToken &&
      jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_SECRET!).success;

    let userRole: UserRole | null = null;

    if (decodedAccessToken) {
      userRole = decodedAccessToken.role as UserRole;
    }

    const routeOwner = getRouteOwner(pathname);

    const unifySuperAdminAndAdminRoles =
      userRole === "SUPER_ADMIN" ? "ADMIN" : userRole;
    userRole = unifySuperAdminAndAdminRoles;

    const isAuth = isAuthRoute(pathname);

    // Proactively refresh token if it's expiring soon
    if (
      isValidAccessToken &&
      refreshToken &&
      (await isTokenExpiringSoon(accessToken))
    ) {
      const requestHeaders = new Headers(request.headers);
      const response = NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });

      try {
        const refreshed = await refreshTokenMiddleware(refreshToken);

        if (refreshed) {
          requestHeaders.set("x-token-refreshed", "1");
        }

        return NextResponse.next({
          request: {
            headers: requestHeaders,
          },
          headers: response.headers,
        });
      } catch (error) {
        console.error("Error refreshing token in middleware:", error);
      }

      return response;
    }

    // Rule-1: User is logged in and trying to access an auth route -> Redirect to dashboard
    // Exclude reset-password and verify-email because they are enforced by Rule-5.
    if (
      isAuth &&
      pathname !== "/reset-password" &&
      pathname !== "/verify-email" &&
      isValidAccessToken
    ) {
      return NextResponse.redirect(
        new URL(getDefaultDashboardRoute(userRole as UserRole), request.url),
      );
    }

    // Rule-2: User trying to access reset-password route
    if (pathname === "/reset-password") {
      const email = request.nextUrl.searchParams.get("email");

      // Case-1: Special handling for reset-password route to allow access if user have needPasswordChange flag set. This is required the first time after the user is created by admin and needs to set their password.
      if (accessToken && email) {
        const userInfo = await getUserInfo();

        if (userInfo.needPasswordChange) {
          return NextResponse.next();
        } else {
          return NextResponse.redirect(
            new URL(
              getDefaultDashboardRoute(userRole as UserRole),
              request.url,
            ),
          );
        }
      }

      // Case-2: User coming from forgot-password flow with email query param should be allowed to access reset-password page without any token checks
      if (email) {
        return NextResponse.next();
      }

      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Rule-3: User trying to access public route -> Allow
    if (routeOwner === null) {
      return NextResponse.next();
    }

    // Rule-4: User is not logged in and trying to access a protected route -> Redirect to login
    if (!accessToken) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Rule-5: Enforce the user to stay in reset-password or verify-email page if they have needPasswordChange or isEmailVerified flag set to false respectively
    if (accessToken) {
      const userInfo = await getUserInfo();
      // Case-1: If user have isEmailVerified flag set to false, enforce them to stay on verify-email page until they verify their email
      if (userInfo.isEmailVerified === false) {
        if (pathname !== "/verify-email") {
          const verifyEmailUrl = new URL("/verify-email", request.url);
          verifyEmailUrl.searchParams.set("email", userInfo.email);
          return NextResponse.redirect(verifyEmailUrl);
        }

        return NextResponse.next();
      }

      // Case-2: If the user already verified their email and have isEmailVerified flag set to true but is trying to access verify-email page, redirect them to dashboard
      if (userInfo.isEmailVerified && pathname === "/verify-email") {
        return NextResponse.redirect(
          new URL(getDefaultDashboardRoute(userRole as UserRole), request.url),
        );
      }

      // Case-3: If user have needPasswordChange flag set, enforce them to stay on reset-password page until they change their password
      if (userInfo.needPasswordChange) {
        if (pathname !== "/reset-password") {
          const resetPasswordUrl = new URL("/reset-password", request.url);
          resetPasswordUrl.searchParams.set("email", userInfo.email);
          return NextResponse.redirect(resetPasswordUrl);
        }

        return NextResponse.next();
      }

      // Case-4: If the user already changed their password and have needPasswordChange flag set to false but is trying to access reset-password page, redirect them to dashboard
      if (!userInfo.needPasswordChange && pathname === "/reset-password") {
        return NextResponse.redirect(
          new URL(getDefaultDashboardRoute(userRole as UserRole), request.url),
        );
      }
    }

    // Rule-6: User trying to access common protected route -> Allow
    if (routeOwner === "COMMON") {
      return NextResponse.next();
    }

    // Rule-7: User trying to visit role based protected route but doesn't have required role -> Redirect to dashboard
    if (
      routeOwner === "ADMIN" ||
      routeOwner === "DOCTOR" ||
      routeOwner === "PATIENT"
    ) {
      if (routeOwner !== userRole) {
        return NextResponse.redirect(
          new URL(getDefaultDashboardRoute(userRole as UserRole), request.url),
        );
      }
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Error in proxy middleware:", error);
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
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)",
  ],
};
