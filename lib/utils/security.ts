/**
 * Security Utilities
 * 
 * Security-related helper functions for authentication and validation.
 */

/**
 * Constant-time string comparison to prevent timing attacks
 * 
 * @param a First string to compare
 * @param b Second string to compare
 * @returns true if strings are equal, false otherwise
 */
export function constantTimeCompare(a: string, b: string): boolean {
  const aBuffer = Buffer.from(a, 'utf8');
  const bBuffer = Buffer.from(b, 'utf8');
  
  if (aBuffer.length !== bBuffer.length) {
    return false;
  }
  
  let mismatch = 0;
  for (let i = 0; i < aBuffer.length; i++) {
    mismatch |= aBuffer[i] ^ bBuffer[i];
  }
  
  return mismatch === 0;
}

/**
 * Verify cron secret with constant-time comparison
 * 
 * @param providedSecret Secret provided in request
 * @param expectedSecret Expected secret from environment
 * @returns true if secrets match
 */
export function verifyCronSecret(providedSecret: string, expectedSecret: string): boolean {
  return constantTimeCompare(providedSecret, expectedSecret);
}

/**
 * Verify admin password with constant-time comparison
 * 
 * @param providedPassword Password provided in request
 * @param expectedPassword Expected password from environment
 * @returns true if passwords match
 */
export function verifyAdminPassword(providedPassword: string, expectedPassword: string): boolean {
  return constantTimeCompare(providedPassword, expectedPassword);
}

/**
 * Return a safe error message for API responses
 *
 * In production, returns a generic message to avoid leaking internal details.
 * In development, returns the actual error message for debugging.
 *
 * @param error The error to process
 * @returns Safe error message string
 */
export function safeErrorMessage(error: unknown): string {
  if (process.env.NODE_ENV === 'production') {
    return 'An internal error occurred';
  }
  return error instanceof Error ? error.message : String(error);
}

/**
 * Parse an integer query parameter with validation
 *
 * Returns the default value if:
 * - Value is null/undefined
 * - Value is not a valid integer
 * - Value is negative
 *
 * Optionally caps the value at a maximum.
 *
 * @param value The string value to parse
 * @param defaultValue Default if invalid
 * @param max Optional maximum value
 * @returns Validated integer
 */
export function parseIntParam(value: string | null, defaultValue: number, max?: number): number {
  if (!value) return defaultValue;
  const parsed = parseInt(value, 10);
  if (!Number.isInteger(parsed) || parsed < 0) return defaultValue;
  return max !== undefined ? Math.min(parsed, max) : parsed;
}

