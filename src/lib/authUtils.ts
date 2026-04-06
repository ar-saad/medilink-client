export type UserRole = "SUPER_ADMIN" | "ADMIN" | "DOCTOR" | "PATIENT";

export const authRoutes = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/verify-email",
];

export const isAuthRoute = (pathname: string): boolean => {
  return authRoutes.some((route) => route === pathname);
};

export type RouteConfig = {
  exact: string[];
  pattern: RegExp[];
};

// export const superAdminProtectedRoutes: RouteConfig = {
//   exact: [],
//   pattern: [/^\/admin\/dashboard/],
// };

export const adminProtectedRoutes: RouteConfig = {
  exact: [],
  pattern: [/^\/admin\/dashboard/],
};

export const doctorProtectedRoutes: RouteConfig = {
  exact: [],
  pattern: [/^\/doctor\/dashboard/],
};

export const patientProtectedRoutes: RouteConfig = {
  exact: ["/payment/success"],
  pattern: [/^\/dashboard/],
};

export const commonProtectedRoutes: RouteConfig = {
  exact: ["/my-profile", "/change-password"],
  pattern: [],
};

export const isRouteMatches = (
  pathname: string,
  routes: RouteConfig,
): boolean => {
  if (routes.exact.includes(pathname)) {
    return true;
  } else {
    return routes.pattern.some((pattern: RegExp) => pattern.test(pathname));
  }
};

export const getRouteOwner = (pathname: string): UserRole | "COMMON" | null => {
  // if (isRouteMatches(pathname, superAdminProtectedRoutes)) {
  //   return "SUPER_ADMIN";
  // } else
  if (isRouteMatches(pathname, adminProtectedRoutes)) {
    return "ADMIN";
  } else if (isRouteMatches(pathname, doctorProtectedRoutes)) {
    return "DOCTOR";
  } else if (isRouteMatches(pathname, patientProtectedRoutes)) {
    return "PATIENT";
  } else if (isRouteMatches(pathname, commonProtectedRoutes)) {
    return "COMMON";
  }
  return null;
};

export const getDefaultDashboardRoute = (role: UserRole): string => {
  if (role === "SUPER_ADMIN" || role === "ADMIN") {
    return "/admin/dashboard";
  } else if (role === "DOCTOR") {
    return "/doctor/dashboard";
  } else if (role === "PATIENT") {
    return "/dashboard";
  } else {
    return "/";
  }
};

export const isValidRedirectForRole = (
  redirectPath: string,
  role: UserRole,
): boolean => {
  const routeOwner = getRouteOwner(redirectPath);
  const unifySuperAdminAndAdmin = role === "SUPER_ADMIN" ? "ADMIN" : role;
  role = unifySuperAdminAndAdmin as UserRole; // Type assertion to satisfy TypeScript

  if (routeOwner === null || routeOwner === "COMMON") {
    return true; // Allow access to public and common routes
  }

  if (routeOwner === role) {
    return true; // Allow access if the route owner matches the user's role
  }

  return false; // Deny access for all other cases
};
