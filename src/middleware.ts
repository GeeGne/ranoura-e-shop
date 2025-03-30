import { NextRequest, NextResponse } from 'next/server';

// supported locales
const locales = ['en', 'ar'];
const defaultLocale = 'en';

function hasLocalePrefix(pathname: string): boolean {
  if (locales.some(locale => pathname === `/${locale}`)) {
    return true;
  }
  
  return locales.some(locale => pathname.startsWith(`/${locale}/`));
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  
  if (hasLocalePrefix(pathname)) {
    return NextResponse.next();
  }
  
  const newUrl = new URL(
    pathname === '/' ? `/${defaultLocale}` : `/${defaultLocale}${pathname}`,
    req.url
  );

  console.log(`[Middleware] Redirecting: ${pathname} -> ${newUrl.pathname}`);
  
  return NextResponse.redirect(newUrl, 307);
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico|assets).*)'],
};