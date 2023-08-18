export async function load({ fetch }) {
	const res = await fetch('/api/segments');
	if (res.ok) {
		const segments = await res.json();
		return { segments };
	}

	return {
		status: res.status
	};
}
