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

const processDatePlaceholders = (data: DateExample[]) => {
	const now = new Date();
	const nextWeek = new Date(now);
	nextWeek.setDate(now.getDate() + 7);

	const nextMonth = new Date(now);
	nextMonth.setMonth(now.getMonth() + 1);

	// Full date and time formatter
	const fullFormatter = new Intl.DateTimeFormat('en-US', {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit'
	});

	// Short date formatter
	const shortFormatter = new Intl.DateTimeFormat('en-US', {
		month: 'short',
		day: 'numeric',
		year: '2-digit'
	});

	// Time formatter
	const timeFormatter = new Intl.DateTimeFormat('en-US', {
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric',
		hour12: true
	});

	// German formatter
	const germanFormatter = new Intl.DateTimeFormat('de-DE', {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});

	// Timezone formatters
	const utcFormatter = new Intl.DateTimeFormat('en-US', {
		timeZone: 'UTC',
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric',
		hour12: true
	});

	const nyFormatter = new Intl.DateTimeFormat('en-US', {
		timeZone: 'America/New_York',
		dateStyle: 'full',
		timeStyle: 'long'
	});

	const laFormatter = new Intl.DateTimeFormat('en-US', {
		timeZone: 'America/Los_Angeles',
		dateStyle: 'full',
		timeStyle: 'long'
	});

	return data.map((item) => ({
		...item,
		outputs: item.outputs.map((output) => ({
			...output,
			value: output.value
				.replace('$CURRENT_ISO_DATE', now.toISOString())
				.replace('$CURRENT_LOCAL_DATE', now.toLocaleString())
				.replace('$CURRENT_UTC_DATE', now.toUTCString())
				.replace('$CURRENT_TIMESTAMP', now.getTime().toString())
				.replace('$CURRENT_FORMATTED_DATE', fullFormatter.format(now))
				.replace('$CURRENT_SHORT_DATE', shortFormatter.format(now))
				.replace('$CURRENT_TIME', timeFormatter.format(now))
				.replace('$CURRENT_GERMAN_DATE', germanFormatter.format(now))
				.replace('$CURRENT_DATE_STRING', now.toDateString())
				.replace('$NEXT_WEEK_DATE_STRING', nextWeek.toDateString())
				.replace('$NEXT_MONTH_DATE_STRING', nextMonth.toDateString())
				.replace('$CURRENT_UTC_TIME', utcFormatter.format(now))
				.replace('$CURRENT_LOCAL_TIME', timeFormatter.format(now))
				.replace('$CURRENT_NY_TIME', nyFormatter.format(now))
				.replace('$CURRENT_LA_TIME', laFormatter.format(now))
		}))
	}));
};

export const load = (async ({ url }) => {
	const framework = url.searchParams.get('framework') || 'sveltekit';
	const rawData = framework === 'nextjs' ? nextjs.data : sveltekit.data;
	const data = processDatePlaceholders(rawData);

	return {
		framework,
		data
	};
}) satisfies PageServerLoad;
