import jwt from 'jsonwebtoken';


// Types
type TokenPayload = {
  email: string;
  tokenType?: 'refresh';
};

type GeneratedTokens = {
  accessToken: string;
  refreshToken: string;
};

type props = {
  ACCESS: number;
  REFRESH: number;
}

const JWT_SECRET: string = process.env.JWT_SECRET || 'test';

const TOKEN_EXPIRY: props = {
  ACCESS: '15m',
  REFRESH: '7d'
};

// export const generateTokens = (email: string) => {
//   const accessToken = jwt.sign(
//     { email } satisfies TokenPayload,
//     JWT_SECRET,
//     { expiresIn: TOKEN_EXPIRY.ACCESS }
//   );
//   const refreshToken = jwt.sign(
//     { email, tokenType: 'refresh' } satisfies TokenPayload,
//     JWT_SECRET,
//     { expiresIn: TOKEN_EXPIRY.REFRESH }
//   )

//   return { accessToken, refreshToken };
// };

// export const verifyToken = (token:string) => {
//   try {
//     return jwt.verify(token, JWT_SECRET);
//   } catch (err) {
//     const error = err as Error;
//     console.error('Token verification failed:', error.message);
//     return null;
//   }
// }

export const generateTokens = (email: string): GeneratedTokens => {
  const accessToken = jwt.sign(
    { email } satisfies TokenPayload,
    JWT_SECRET,
    { expiresIn: TOKEN_EXPIRY.ACCESS }
  );

  const refreshToken = jwt.sign(
    { email, tokenType: 'refresh' } satisfies TokenPayload,
    JWT_SECRET,
    { expiresIn: TOKEN_EXPIRY.REFRESH }
  );

  return { accessToken, refreshToken };
};

/**
 * Verify JWT token
 */
export const verifyToken = (token: string): VerifiedToken | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as VerifiedToken;
  } catch (err) {
    console.error('Token verification failed:', err instanceof Error ? err.message : 'Unknown error');
    return null;
  }
};
