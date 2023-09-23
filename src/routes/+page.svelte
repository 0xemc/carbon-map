<script lang="ts">
	import Map from '$lib/Map/Map.svelte';
	import type { MapEvent } from '$lib/Map/map.types';
	import StatsCard from '$lib/components/StatsCard/StatsCard.svelte';
	import { toGeoJson } from '$lib/utils/geo.utils';
	import { Button, Label, Search, Select } from 'flowbite-svelte';
	import { Icon } from 'flowbite-svelte-icons';
	import type { FetchMetricsResponse } from './api/+server';

	const DEFAULT_METRICS: FetchMetricsResponse = {
		trees: [],
		area: '-',
		coverage: 0,
		carbon: 0
	};

	export let data;

	let segmentOptions = data.segments.map((segment) => ({
		value: { ...segment, center: segment.data[0] },
		name: segment.id,
		id: segment.id
	}));
	let focusedSegment = segmentOptions[0];
	let metrics = DEFAULT_METRICS;
	let layers: mapboxgl.AnyLayer[];
	let sources: [string, mapboxgl.AnySourceData][] = [];

	const handleUpdate = (e: MapEvent) => {
		const coords = e.features?.at(0)?.geometry.coordinates;
		fetchMetrics(coords);
	};

	const fetchMetrics = async (coords: any) => {
		const resp = await fetch('/api', { method: 'POST', body: JSON.stringify(coords) });
		metrics = await resp.json();
	};

	$: {
		let segment_sources = data.segments.map((segment) => [segment.id, toGeoJson(segment.data)]);
		let tree_source = [
			'trees',
			{
				type: 'geojson',
				data: {
					type: 'Feature',
					properties: {},
					geometry: {
						type: 'MultiPoint',
						coordinates: metrics.trees?.map(({ lon, lat }) => [lon, lat])
					}
				}
			}
		];
		sources = [...(segment_sources ?? []), tree_source];

		let segment_layers = data.segments.map((segment) => ({
			id: segment.id,
			type: 'fill',
			source: segment.id, // reference the data source
			layout: {},
			paint: {
				'fill-color': '#0080ff', // blue color fill
				'fill-opacity': 0.5
			}
		}));

		let tree_layer = {
			id: 'tree-layer',
			type: 'circle',
			source: 'trees',
			paint: {
				'circle-radius': metrics.trees?.length > 0 ? 2 : 0,
				'circle-color': '#FFF'
			}
		};
		layers = [...(segment_layers ?? []), tree_layer];
	}
</script>

<Map
	{layers}
	{sources}
	flyTo={focusedSegment.center}
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
<div class=" fixed left-1/2 transform -translate-x-1/2 options w-500">
	<div class="search grid grid-flow-col gap-1">
		<Search on:change={console.log} size="md" /><Button class="!p-2.5">
			<Icon name="search-outline" class="w-5 h-5" />
		</Button>
	</div>
	<div>
		<Label>
			<h4 class="text-sm text font-semibold tracking-tight text-[12px]">SEGMENT</h4>
			<Select size="sm" class="mt-2" items={segmentOptions} bind:value={focusedSegment} />
		</Label>
	</div>
</div>

<style lang="">
	#overlay {
		position: absolute;
		top: 0;
		left: 0;
	}
	.options {
		top: 15px;
	}
	.search {
		display: none;
	}
</style>
