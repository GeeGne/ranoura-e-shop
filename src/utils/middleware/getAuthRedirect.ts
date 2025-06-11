import { verifyToken } from '@/utils/jwt';

export default async function getAuthRedirect(pathname: string, authToken?: string) {
  const authRoutes = ['/en/signin', '/ar/signin', '/en/signup', '/ar/signup'];
  const protectedRoutes = ['/en/welcome', '/ar/welcome', '/en/dashboard', '/ar/dashboard'];
  
  const isAuthTokenVerified = authToken ? await verifyToken(authToken) : null;
  if (isAuthTokenVerified && authRoutes.includes(pathname)) {
    console.log('isAuthTokenVerified', isAuthTokenVerified);
    return `/welcome/${isAuthTokenVerified.fullNameSlug}`;
  }

  if (!isAuthTokenVerified && protectedRoutes.some(route => pathname.startsWith(route))) {
    console.log('getAuth, working!')
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