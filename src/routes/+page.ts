import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = false;

export const load: PageLoad = ({ url }) => {
	if (url.pathname === '/' && !url.searchParams.has('md')) {
		redirect(307, '/?md=home');
	}
};

