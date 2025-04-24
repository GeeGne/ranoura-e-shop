import { NextRequest, NextResponse } from 'next/server';

// supported locales
const locales = ['en', 'ar'];
const defaultLocale = 'en';
const defaultAdminUrl = '/view-tabs';

function hasLocalePrefix(pathname: string): boolean {
  if (locales.some(locale => pathname === `/${locale}`)) {
    return true;
  }
  
  return locales.some(locale => pathname.startsWith(`/${locale}/`));
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const preferredLocale = req.cookies.get('preferredLang')?.value;
  const localToUse = preferredLocale && locales.includes(preferredLocale) 
    ? preferredLocale
    : defaultLocale

  if (hasLocalePrefix(pathname)) return NextResponse.next();

  const hasAdmin = req.url.endsWith('admin');
  if (hasAdmin) {
    console.log('url: ', `${pathname}${defaultAdminUrl}`);
    const newUrl = new URL(`${pathname}${defaultAdminUrl}`, req.url);
    return NextResponse.redirect(newUrl);
  }
  
  console.log('has no Admin');

  const newUrl = new URL(
    pathname === '/' ? `/${localToUse}` : `/${localToUse}${pathname}`,
    req.url
  );

  console.log(`[Middleware] Redirecting: ${pathname} -> ${newUrl.pathname}`);
  
  return NextResponse.redirect(newUrl, 307);
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico|assets).*)'],
};