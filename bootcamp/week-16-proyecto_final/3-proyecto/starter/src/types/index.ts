import { TokenPayload } from '../utils/jwt';

// Extends Express Request with the authenticated user's payload.
// Set by authenticate middleware after JWT verification.
declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}
