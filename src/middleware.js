import { NextResponse } from "next/server";

export function middleware(req){
    const token = req.cookies.get("token");
    const {pathname} = req.nextUrl;
     
    //if Token Exists
    if(token && (pathname === '/home')){
        return NextResponse.redirect(new URL('/user-page', req.url));
    }

    //If token doesn't exist
    if(!token && (pathname === '/user-page')){
        return NextResponse.redirect(new URL('/home', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/home', '/user-page']
}