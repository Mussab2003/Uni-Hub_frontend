import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token");
  const googleLogin = req.cookies.get("isGoogle");
  const isGoogle = googleLogin === "true" ? true : false;
  
  const { pathname, searchParams } = req.nextUrl;

  const queryToken = searchParams.get("jwt");
  const queryName = searchParams.get("name");

  // Check for a valid token and handle redirect from "/home"
  if (token && pathname === "/home") {
    return NextResponse.redirect(new URL("/user-page", req.url));
  }

  // Handle cases where token doesn't exist and user is on "/user-page"
  if (!token && pathname.startsWith("/user-page")) {
    if (queryToken && queryName) {
      const response = NextResponse.next();
      response.cookies.set("token", queryToken, { path: "/", maxAge: 60 * 60 * 24 });
      response.cookies.set("name", queryName, { path: "/", maxAge: 60 * 60 * 24});
      response.cookies.set("isGoogle", true, { path: "/", maxAge: 60 * 60 * 24 });
      return response;
    }
    return NextResponse.redirect(new URL("/home", req.url));
  }

  // Redirect dynamic repo ID routes under "/user-page/[repo-id]"
  const dynamicRepoRegex = /^\/user-page\/[^\/]+$/;
  if (!token && dynamicRepoRegex.test(pathname)) {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  if(!isGoogle && pathname === '/courses'){
    return NextResponse.redirect(new URL("/home", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/home", "/user-page/:path*", "/courses"],
};
