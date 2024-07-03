import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware({
	ignoredRoutes: [
		'/api/webhook',
		'/api/chatgpt',
		'/',
		'/question/:id',
		'/tags',
		'/tags/:id',
		'/profile/:id',
		'/community',
		'/jobs',
	],
});

export const config = {
	matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
