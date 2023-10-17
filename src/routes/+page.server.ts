import type { Tables } from '$lib/types/database.types.js';

export async function load(event) {
	const res = await event.fetch('/api/segments');
	if (res.ok) {
		const segments: Tables<'segments'>[] = await res.json();
		return { segments };
	}

	return {
		status: res.status
	};
}
