import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/utils/jwt';
import getAuthRedirect from '@/utils/middleware/getAuthRedirect';
import checkUserRole from '@/lib/api/auth/role/get';

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

const isAnApiRoute = (pathname: string) => pathname.startsWith('/api');

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const { method } = req;
  console.log('middleware pahtname: ', pathname);

  switch(true) {
    case isAnApiRoute(pathname):
      console.log('starts with api!');
      if (pathname.startsWith('/api/v1/products') && method === 'POST') {
        console.log('A products api request!');
        const { isRoleMatched } = await checkUserRole('admin');
        if (isRoleMatched) return NextResponse.next();
        return NextResponse.json({ 
          success: false , message: 'Forbidden: Admin access required' 
        }, { status: 403});
      }
      return NextResponse.next();
    default:
      const preferredLocale = req.cookies.get('preferredLang')?.value;
      const authToken = req.cookies.get('accessToken')?.value;

      const redirectUrl = await getAuthRedirect(pathname, authToken);
      console.log('authToken: ', authToken);
      console.log('redirectUrl: ', redirectUrl);
      if (redirectUrl) 
        return NextResponse.redirect(new URL(redirectUrl, req.url));
    
      const localToUse = preferredLocale && locales.includes(preferredLocale) 
        ? preferredLocale
        : defaultLocale
    
      if (hasLocalePrefix(pathname)) return NextResponse.next();
    
      // Navigate to profile tab by default
      const hasDashboard = req.url.endsWith('dashboard');
      if (hasDashboard) {
        console.log('url: ', `${pathname}${defaultAdminUrl}`);
        const newUrl = new URL(`${pathname}${defaultAdminUrl}`, req.url);
        return NextResponse.redirect(newUrl);
      }
      
      console.log('has no Dashboard');
      
      // adjust the url by adding the user language tag
      const newUrl = new URL(
        pathname === '/' ? `/${localToUse}` : `/${localToUse}${pathname}`,
        req.url
      );
    
      console.log(`[Middleware] Redirecting: ${pathname} -> ${newUrl.pathname}`);
      
      return NextResponse.redirect(newUrl, 307);
  }

}

export const config = {
  matcher: ['/((?!_next|favicon.ico|assets).*)'],
};