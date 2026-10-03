import type { RequestHandler } from './$types';
import { PASSWORD } from '$env/static/private';
import { error } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, cookies }) => {
	const data = await request.json();

	if (!data.password) {
		error(400, 'Password required');
	}

	if (data.password !== PASSWORD) {
		error(401, 'Invalid password');
	}

	cookies.set('token', data.password, {
		path: '/',
		httpOnly: true,
		secure: true,
		sameSite: 'strict',
		maxAge: 60 * 60 * 24 * 7
	});

	return new Response('ok', { status: 200 });
};