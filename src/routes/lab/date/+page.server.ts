import type { PageServerLoad } from './$types';
import sveltekit from './sveltekit.json';
import nextjs from './nextjs.json';

interface DateOutput {
	label: string;
	value: string;
}

interface DateExample {
	title: string;
	explanation: string;
	code: string;
	outputs: DateOutput[];
}

export const load = (async ({ url }) => {
	const framework = url.searchParams.get('framework') || 'sveltekit';
	const data = framework === 'nextjs' ? nextjs.data : sveltekit.data;

	return {
		framework,
		data
	};
}) satisfies PageServerLoad;
