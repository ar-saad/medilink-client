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
    const accessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET;

    const accessTokenVerification =
      accessToken && accessTokenSecret
        ? jwtUtils.verifyToken(accessToken, accessTokenSecret)
        : null;

    const decodedAccessToken =
      accessTokenVerification && accessTokenVerification.success
        ? accessTokenVerification.data
        : null;

    const isValidAccessToken = Boolean(
      accessTokenVerification && accessTokenVerification.success,
    );

    let userRole: UserRole | null = null;

    if (decodedAccessToken) {
      userRole = decodedAccessToken.role as UserRole;
    }

    const routeOwner = getRouteOwner(pathname);

    const unifySuperAdminAndAdminRoles =
      userRole === "SUPER_ADMIN" ? "ADMIN" : userRole;
    userRole = unifySuperAdminAndAdminRoles;

    const isAuth = isAuthRoute(pathname);

    const emailVerifiedFromToken =
      decodedAccessToken &&
      typeof decodedAccessToken.emailVerified === "boolean"
        ? decodedAccessToken.emailVerified
        : null;

    const needPasswordChangeFromToken =
      decodedAccessToken &&
      typeof decodedAccessToken.needPasswordChange === "boolean"
        ? decodedAccessToken.needPasswordChange
        : null;

    const emailFromToken =
      decodedAccessToken && typeof decodedAccessToken.email === "string"
        ? decodedAccessToken.email
        : null;

    let userInfoCache:
      | {
          emailVerified: boolean;
          needPasswordChange: boolean;
          email: string;
        }
      | null
      | undefined;

    const getResolvedUserInfo = async () => {
      if (userInfoCache !== undefined) {
        return userInfoCache;
      }

      if (
        emailVerifiedFromToken !== null &&
        needPasswordChangeFromToken !== null &&
        emailFromToken
      ) {
        userInfoCache = {
          emailVerified: emailVerifiedFromToken,
          needPasswordChange: needPasswordChangeFromToken,
          email: emailFromToken,
        };
        return userInfoCache;
      }

      const fetchedUserInfo = await getUserInfo();

      if (!fetchedUserInfo) {
        userInfoCache = null;
        return userInfoCache;
      }

      if (
        typeof fetchedUserInfo.emailVerified !== "boolean" ||
        typeof fetchedUserInfo.needPasswordChange !== "boolean" ||
        typeof fetchedUserInfo.email !== "string"
      ) {
        userInfoCache = null;
        return userInfoCache;
      }

      userInfoCache = {
        emailVerified: fetchedUserInfo.emailVerified,
        needPasswordChange: fetchedUserInfo.needPasswordChange,
        email: fetchedUserInfo.email,
      };
      return userInfoCache;
    };

    // Proactively refresh token if it's expiring soon
    if (
      isValidAccessToken &&
      accessToken &&
      refreshToken &&
      !isAuth &&
      routeOwner !== null &&
      (await isTokenExpiringSoon(accessToken, 60))
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
        const userInfo = await getResolvedUserInfo();

        if (!userInfo) {
          const loginUrl = new URL("/login", request.url);
          loginUrl.searchParams.set("redirect", pathname);
          return NextResponse.redirect(loginUrl);
        }

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

    // Rule-5: Enforce the user to stay in reset-password or verify-email page if they have needPasswordChange or emailVerified set to false respectively
    if (accessToken) {
      const userInfo = await getResolvedUserInfo();

      if (!userInfo) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("redirect", pathname);
        return NextResponse.redirect(loginUrl);
      }

      // Case-1: If user has emailVerified set to false, enforce verify-email page until verified.
      if (userInfo.emailVerified === false) {
        if (pathname !== "/verify-email") {
          const verifyEmailUrl = new URL("/verify-email", request.url);
          verifyEmailUrl.searchParams.set("email", userInfo.email);
          return NextResponse.redirect(verifyEmailUrl);
        }

        return NextResponse.next();
      }

      // Case-2: If the user already verified their email but is trying to access verify-email page, redirect to dashboard.
      if (userInfo.emailVerified && pathname === "/verify-email") {
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
    return NextResponse.next();
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
