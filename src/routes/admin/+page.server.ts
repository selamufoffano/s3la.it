import type { PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';
import { PASSWORD } from '$env/static/private';

export const load = (async ({ cookies }) => {
	const token = cookies.get('token');
	if (!token || token != PASSWORD) redirect(307, '/login');
	return {};
}) satisfies PageServerLoad;
