import { headers } from 'next/headers';

export interface RequestUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

/**
 * Get user information from request headers set by the proxy
 * These headers are set by the proxy.ts file after validating the session
 */
export async function getUserFromHeaders(): Promise<RequestUser | null> {
  const headersList = await headers();
  
  const userId = headersList.get('x-user-id');
  const userEmail = headersList.get('x-user-email');
  const userName = headersList.get('x-user-name');
  const userRole = headersList.get('x-user-role');

  if (!userId) {
    return null;
  }

  return {
    id: userId,
    email: userEmail || '',
    name: userName || '',
    role: userRole || 'STUDENT',
  };
}

/**
 * Check if the current user has one of the allowed roles
 */
export async function hasRole(allowedRoles: string[]): Promise<boolean> {
  const user = await getUserFromHeaders();
  if (!user) return false;
  return allowedRoles.includes(user.role);
}

/**
 * Require a specific role, throws if not authorized
 */
export async function requireRole(allowedRoles: string[]): Promise<RequestUser> {
  const user = await getUserFromHeaders();
  if (!user) {
    throw new Error('Unauthorized');
  }
  if (!allowedRoles.includes(user.role)) {
    throw new Error('Forbidden');
  }
  return user;
}
