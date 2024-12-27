const ADMIN_ROUTES = /^\/admin(\/.*)?$/;

const PUBLIC_ROUTES = /^\/($|about$|contact$|auth\/new-verification$|blogs(\/[^/]+)?$)/;

const AUTH_ROUTES = ['/auth/login', '/auth/register', '/auth/error', '/auth/reset', '/auth/new-password'];

const API_AUTH_PREFIX = '/api/auth';

const DEFAULT_LOGIN_REDIRECT = '/user/dashboard';

const ROUTE_MAPPINGS = {
  '/user': '/user/dashboard',
  '/admin': '/admin/dashboard',
} as const;

export { ADMIN_ROUTES, AUTH_ROUTES, DEFAULT_LOGIN_REDIRECT, PUBLIC_ROUTES, API_AUTH_PREFIX, ROUTE_MAPPINGS };
