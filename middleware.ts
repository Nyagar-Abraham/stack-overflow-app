import { authMiddleware } from '@clerk/nextjs/server';

export default authMiddleware({
	publicRoutes: ['/api/webhooks', '/'],
	ignoredRoutes: ['/api/webhooks'],
});

export const config = {
	matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
