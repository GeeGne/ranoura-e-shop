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
  ACCESS: string;
  REFRESH: string;
}
type VerifiedToken = TokenPayload & jwt.JwtPayload;

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

const TOKEN_EXPIRY: props = {
  ACCESS: '15m',
  REFRESH: '7d'
};

export const generateTokens = (email: string): GeneratedTokens => {
  const accessToken = jwt.sign(
    { email } satisfies TokenPayload,
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  const refreshToken = jwt.sign(
    { email, tokenType: 'refresh' } satisfies TokenPayload,
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  return { accessToken, refreshToken };
};

export const verifyToken = (token: string): VerifiedToken | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as VerifiedToken;
  } catch (err) {
    console.error('Token verification failed:', err instanceof Error ? err.message : 'Unknown error');
    return null;
  }
};
