export async function load(event) {
	const res = await event.fetch('/api/segments');
	if (res.ok) {
		const segments = await res.json();
		return { segments };
	}

	return {
		status: res.status
	};
}
