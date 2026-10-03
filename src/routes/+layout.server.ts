import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = ({ url }) => {
	if (url.pathname === '/' && !url.searchParams.has('md')) {
		redirect(307, '/?md=home');
	}
};