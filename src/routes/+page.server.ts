import type { Tables } from '$lib/types/database.types.js';

export async function load(event) {
	let res;
	try {
		console.debug('load start');
		console.time('load');
		res = await event.fetch('/api/segments');
		console.debug('load end');
		console.timeEnd('load');
		if (res.ok) {
			const segments: Tables<'segments'>[] = await res.json();
			return { segments };
		}
	} catch (e) {
		console.error(e);
	}
	return {
		status: res?.status
	};
}
