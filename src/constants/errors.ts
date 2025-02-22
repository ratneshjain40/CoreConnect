export const BASE_ERROR_CODES = {
  INTERNAL_SERVER_ERROR: {
    code: 500,
    message: 'An unexpected error occurred. Please try again later.',
  },
};

const createErrorCode = (code: number, message: string) => ({ code, message });

export const AUTH_ERROR_CODES = {
  USER_ALREADY_EXISTS: createErrorCode(409, 'User already exists. Please Login!'),
  EMAIL_NOT_VERIFIED: createErrorCode(403, 'Email not verified. Confirmation email sent!'),
  USER_NOT_FOUND: createErrorCode(404, 'User not found'),
  INVALID_RESET_TOKEN: createErrorCode(400, 'Invalid or expired reset token'),
  PASSWORD_NOT_ASSOCIATED: createErrorCode(403, 'Password not associated with account'),
  INVALID_PASSWORD: createErrorCode(401, 'Invalid password'),
  USER_NOT_AUTHENTICATED: createErrorCode(401, 'User not authenticated'),
  TWO_FACTOR_NOT_ENABLED: createErrorCode(403, '2FA not enabled for this account'),
  INVALID_2FA_CODE: createErrorCode(400, 'Invalid 2FA code'),
  INVALID_VERIFICATION_TOKEN: createErrorCode(400, 'Invalid email verification token'),
  INTERNAL_SERVER_ERROR: BASE_ERROR_CODES.INTERNAL_SERVER_ERROR,
};

export const BLOG_ERROR_CODES = {
  BLOG_NOT_FOUND: createErrorCode(404, 'Blog not found'),
  BLOG_COMMENT_NOT_FOUND: createErrorCode(404, 'Blog comment not found'),
  UNAUTHORIZED_UPDATE_BLOG: createErrorCode(403, 'You are not authorized to update this blog'),
  UNAUTHORIZED_DELETE_BLOG: createErrorCode(403, 'You are not authorized to delete this blog'),
  UNAUTHORIZED_DELETE_COMMENT: createErrorCode(403, 'You are not authorized to delete this blog comment'),
  INTERNAL_SERVER_ERROR: BASE_ERROR_CODES.INTERNAL_SERVER_ERROR,
};

export const EVENT_ERROR_CODES = {
  EVENT_NOT_FOUND: createErrorCode(404, 'Event not found'),
  INVALID_DATE_RANGE: createErrorCode(400, 'Start date must be before or the same as the end date'),
  REGISTRATION_NOT_FOUND: createErrorCode(404, 'Registration not found'),
  INTERNAL_SERVER_ERROR: BASE_ERROR_CODES.INTERNAL_SERVER_ERROR,
};
