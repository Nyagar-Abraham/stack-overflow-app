import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware({
	publicRoutes: [
		'/',
		'/api/webhook',
		'/question/:id',
		'/tags',
		'/tags/:id',
		'/profile/:id',
		'/community',
		'/jobs',
	],
	ignoredRoutes: ['/api/webhook', '/api/chatgpt'],
});

export const config = {
	matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
