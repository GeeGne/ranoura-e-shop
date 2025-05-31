// import jwt from 'jsonwebtoken';
import { SignJWT, jwtVerify } from 'jose';

type TokenPayload = {
  fullNameSlug: string;
  email: string;
  tokenType?: 'refresh';
};

type GeneratedTokens = {
  accessToken: string;
  refreshToken: string;
};

const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const secretKey = new TextEncoder().encode(JWT_SECRET);

export const generateTokens = async (
  fullNameSlug: string, 
  email: string
): Promise<GeneratedTokens> => {
  const accessToken = await new SignJWT({ fullNameSlug, email })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(secretKey);

  const refreshToken = await new SignJWT({ 
    fullNameSlug, 
    email, 
    tokenType: 'refresh' 
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(secretKey);

  return { accessToken, refreshToken };
};

export const verifyToken = async (token: string): Promise<TokenPayload | null> => {
  try {
    const { payload } = await jwtVerify(token, secretKey);
    return payload as TokenPayload;
  } catch (err) {
    console.error('Token verification failed:', err instanceof Error ? err.message : 'Unknown error');
    return null;
  }
};

// Types
// type TokenPayload = {
//   fullNameSlug: string;
//   email: string;
//   tokenType?: 'refresh';
// };

// type GeneratedTokens = {
//   accessToken: string;
//   refreshToken: string;
// };

// type props = {
//   ACCESS: string;
//   REFRESH: string;
// }
// type VerifiedToken = TokenPayload & jwt.JwtPayload;

// const JWT_SECRET = process.env.JWT_SECRET || 'secret';

// const TOKEN_EXPIRY: props = {
//   ACCESS: '15m',
//   REFRESH: '7d'
// };

// export const generateTokens = (fullNameSlug: string, email: string): GeneratedTokens => {
//   const accessToken = jwt.sign(
//     { fullNameSlug , email } satisfies TokenPayload,
//     JWT_SECRET,
//     { expiresIn: '7d' }
//   );

//   const refreshToken = jwt.sign(
//     { fullNameSlug, email, tokenType: 'refresh' } satisfies TokenPayload,
//     JWT_SECRET,
//     { expiresIn: '7d' }
//   );

//   return { accessToken, refreshToken };
// };

// export const verifyToken = (token: string): VerifiedToken | null => {
//   try {
//     return jwt.verify(token, JWT_SECRET) as VerifiedToken;
//   } catch (err) {
//     console.error('Token verification failed:', err instanceof Error ? err.message : 'Unknown error');
//     return null;
//   }
// };
