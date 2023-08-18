<script lang="ts">
	import Map from '$lib/Map/Map.svelte';
	import type { MapEvent } from '$lib/Map/map.types';
	import StatsCard from '$lib/components/StatsCard/StatsCard.svelte';
	import { NEW_NORFOLK_BOUNDING_BOX } from '$lib/constants/bounding_boxes';
	import { toGeoJson } from '$lib/utils/geo.utils';
	import { Button, Label, Search, Select } from 'flowbite-svelte';
	import { Icon } from 'flowbite-svelte-icons';
	import type { FetchMetricsResponse } from './api/+server';
	import type { SelectOptionType } from 'flowbite-svelte/dist/types';

	const DEFAULT_METRICS: FetchMetricsResponse = {
		trees: [],
		area: '-',
		coverage: 0,
		carbon: 0
	};

	export let data;
	let segmentOptions = data.segments.map((segment) => ({
		value: segment.id,
		name: segment.id,
		center: segment.data[0]
	}));
	let focusedSegment: SelectOptionType = segmentOptions[0];
	let metrics = DEFAULT_METRICS;
	let markers: [number, number][] = [];
	let layers: mapboxgl.AnyLayer[] = [];
	let sources: [string, mapboxgl.AnySourceData][] = [];

	const handleUpdate = (e: MapEvent) => {
		const coords = e.features?.at(0)?.geometry.coordinates;
		console.log(coords);
		fetchMetrics(coords);
	};

	const fetchMetrics = async (coords: any) => {
		const resp = await fetch('/api', { method: 'POST', body: JSON.stringify(coords) });
		metrics = await resp.json();
		console.log(metrics);
	};

	$: markers = metrics.trees.map(({ lon, lat }) => [lon, lat]);
	$: sources = data.segments.map((segment) => [segment.id, toGeoJson(segment.data)]);
	$: layers = data.segments.map((segment) => ({
		id: segment.id,
		type: 'fill',
		source: segment.id, // reference the data source
		layout: {},
		paint: {
			'fill-color': '#0080ff', // blue color fill
			'fill-opacity': 0.5
		}
	}));
</script>

<Map
	{markers}
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
<div class=" fixed left-1/2 transform -translate-x-1/2 searchbar w-500">
	<div class="grid grid-flow-col gap-1">
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
	.searchbar {
		top: 15px;
	}
</style>
