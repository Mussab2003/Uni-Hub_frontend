import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token");
  const { pathname, searchParams } = req.nextUrl;

  const queryToken = searchParams.get("jwt");
  const queryName = searchParams.get("name");

  //console.log(req.nextUrl)
  console.log(queryToken, queryName);
  //if Token Exists
  if (token && pathname === "/home") {
    return NextResponse.redirect(new URL("/user-page", req.url));
  }
  //If token doesn't exist
  if (!token && pathname === "/user-page") {
    if (queryToken && queryName) {
        const response = NextResponse.next()
        response.cookies.set("token", queryToken, { path: "/", maxAge: 60 * 60 });
        response.cookies.set("name", queryName, { path: "/", maxAge: 60 * 60 });
        response.cookies.set("isGoogle", true, { path: "/", maxAge: 60 * 60 });
        return response;
    }
    return NextResponse.redirect(new URL("/home", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/home", "/user-page"],
};
