import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/utils/jwt';
import getAuthRedirect from '@/utils/middleware/getAuthRedirect';

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

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const preferredLocale = req.cookies.get('preferredLang')?.value;
  const authToken = req.cookies.get('accessToken')?.value;
  const redirectUrl = await getAuthRedirect(pathname, authToken);
  console.log('authToken: ', authToken);
  if (redirectUrl) 
    return NextResponse.redirect(new URL(redirectUrl, req.url));

  const localToUse = preferredLocale && locales.includes(preferredLocale) 
    ? preferredLocale
    : defaultLocale

  if (hasLocalePrefix(pathname)) return NextResponse.next();

  const hasDashboard = req.url.endsWith('dashboard');
  if (hasDashboard) {
    console.log('url: ', `${pathname}${defaultAdminUrl}`);
    const newUrl = new URL(`${pathname}${defaultAdminUrl}`, req.url);
    return NextResponse.redirect(newUrl);
  }
  
  console.log('has no Dashboard');

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