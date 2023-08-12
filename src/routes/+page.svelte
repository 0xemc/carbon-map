<script lang="ts">
	import Map from '$lib/Map/Map.svelte';
	import type { MapEvent } from '$lib/Map/map.types';
	import StatsCard from '$lib/components/StatsCard/StatsCard.svelte';
	import { NEW_NORFOLK_BOUNDING_BOX } from '$lib/constants/bounding_boxes';
	import type { FetchMetricsResponse } from './api/+server';

	const DEFAULT_METRICS: FetchMetricsResponse = {
		trees: [],
		area: '-',
		coverage: 0,
		carbon: 0
	};

	let metrics = DEFAULT_METRICS;

	const handleUpdate = (e: MapEvent) => {
		const coords = e.features?.at(0)?.geometry.coordinates;
		console.log(coords);
		fetchMetrics(coords);
	};

	const fetchMetrics = async (coords: any) => {
		const resp = await fetch('/api', { method: 'POST', body: JSON.stringify(coords) });
		metrics = await resp.json();
		console.log(metrics.trees);
	};

	let markers: [number, number][] = [];
	let layers: mapboxgl.AnyLayer[] = [
		{
			id: 'new_norfolk',
			type: 'fill',
			source: 'new_norfolk', // reference the data source
			layout: {},
			paint: {
				'fill-color': '#0080ff', // blue color fill
				'fill-opacity': 0.5
			}
		}
	];
	let sources: [string, mapboxgl.AnySourceData][] = [
		[
			'new_norfolk',
			{
				type: 'geojson',
				data: {
					type: 'Feature',
					geometry: {
						type: 'Polygon',
						// These coordinates outline Maine.
						coordinates: [NEW_NORFOLK_BOUNDING_BOX]
					}
				}
			}
		]
	];

	$: markers = metrics.trees.map(({ lon, lat }) => [lon, lat]);
</script>

<Map
	{markers}
	{layers}
	{sources}
	handlers={[
		[['draw.create', 'draw.update'], handleUpdate],
		[
			['draw.delete'],
			() => {
				metrics = DEFAULT_METRICS;
			}
		]
	]}
/>
<div id="overlay" class="p-8">
	<StatsCard {metrics} />
</div>

<style>
	#overlay {
		position: absolute;
		top: 0;
		left: 0;
	}
</style>
