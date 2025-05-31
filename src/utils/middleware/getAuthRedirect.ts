import { verifyToken } from '@/utils/jwt';

export default async function getAuthRedirect(pathname: string, authToken?: string) {
  const authRoutes = ['/signin', '/signup'];
  const protectedRoutes = ['/welcome', '/dashboard'];
  
  const isAuthTokenVerified = authToken ? await verifyToken(authToken) : null;

  if (isAuthTokenVerified && authRoutes.includes(pathname)) {
    return `/welcome/${isAuthTokenVerified.fullNameSlug}`;
  }

  if (!isAuthTokenVerified && protectedRoutes.some(route => pathname.startsWith(route))) {
    return '/signin';
  }

  return null;
}

// import { verifyToken } from '@/utils/jwt';
// 
// export default function getAuthRedirect (pathname: string, authToken: any) {
  // const authRoutes = ['/signin', '/signup'];
  // const protectedRoutes = ['/welcome', '/dashboard']
  // const isAuthTokenVerified = verifyToken(authToken);
  // if (isAuthTokenVerified && authRoutes.includes(pathname)) {
    // const { fullNameSlug } = isAuthTokenVerified;
    // return `/welcome/${fullNameSlug}`;
  // }
  // if (
    // !isAuthTokenVerified 
    // && protectedRoutes.some(route => pathname.startsWith(route))
  // ) return '/signin';
  // 
  // return null;
  // 
// }