<script lang="ts">
	import Map from '$lib/Map/Map.svelte';
	import { Card, Checkbox, Label, Select } from 'flowbite-svelte';
	import type { MapEvent } from '$lib/Map/map.types';
	import numeral from 'numeral';
	import type { FetchMetricsResponse } from './api/+server';
	import { NEW_NORFOLK_BOUNDING_BOX } from '$lib/constants/bounding_boxes';

	const DEFAULT_METRICS: FetchMetricsResponse = {
		trees: [],
		area: '-',
		coverage: 0,
		carbon: 0
	};

	let metrics = DEFAULT_METRICS;
	let segment: string;

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

	function formatCarbon(carbon: number) {
		if (carbon >= 1000) {
			return numeral(carbon / 1000).format('0,0');
		} else {
			return numeral(carbon).format('0,0');
		}
	}

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
	<Card class="flex space-y-6">
		<hr class="w-6" />
		<div class="flex">
			<h2 class="text-6xl text-white">
				{formatCarbon(metrics.carbon)}<sub class="text-base"
					>{#if metrics.carbon < 1000}T{:else} MT{/if}</sub
				>
			</h2>
			<sub class="text-xs justify-end align-bottom">CO2</sub>
		</div>
		<hr class="border-" />
		<div class="space-y-4">
			<h4 class="text-sm text font-semibold tracking-tight text-[12px]">VEGETATION</h4>
			<div class="grid grid-cols-2">
				<span class="flex text-white space-x-2"
					><img src="icons/leaf.svg" alt="leaf" />
					<p>{metrics.coverage}%</p></span
				>
				<span class="flex text-white space-x-2"
					><img src="icons/tree.svg" alt="tree" />
					<p>{metrics.trees.length}</p></span
				>
			</div>
		</div>
		<div class="space-y-4">
			<h4 class="text-sm text font-semibold tracking-tight text-[12px]">DISTRIBUTION</h4>
			<div class="grid grid-cols-3 space-x-3">
				<span class="flex text-white space-x-2"
					><img src="icons/tree.svg" alt="tree" />
					<p>43%</p></span
				>
				<span class="flex text-white space-x-2">
					<img src="icons/leaf.svg" alt="leaf" />
					<p>51%</p>
				</span>
				<span class="flex text-white space-x-2">
					<img src="icons/grass.svg" alt="grass" />
					<p>6%</p>
				</span>
			</div>
		</div>
		<div class="space-y-4">
			<h4 class="text-sm text font-semibold tracking-tight text-[12px]">LAND</h4>
			<div class="grid grid-cols-3 space-x-3">
				<span class="flex text-white space-x-2">
					<img src="icons/ruler-plus.svg" alt="max" />
					<p>83 m</p>
				</span>
				<span class="flex text-white space-x-2">
					<img src="icons/angle.svg" alt="angle" />
					<p>12°</p>
				</span>
				<span class="flex text-white space-x-2">
					<img src="icons/celsius.svg" alt="celsius" />
					<p>7°</p>
				</span>
			</div>

			<div class="grid grid-cols-2 space-x-3">
				<span class="flex text-white space-x-2">
					<img src="icons/area.svg" alt="area" />
					<p>{metrics.area}</p>
				</span>
				<span class="flex text-white space-x-2">
					<img src="icons/water-soil.svg" alt="water-soil" />
					<p>12m</p>
				</span>
			</div>
		</div>
		<hr class="border-" />
		<Label>
			<h4 class="text-sm text font-semibold tracking-tight text-[12px]">SEGMENT</h4>
			<Select
				size="sm"
				class="mt-2"
				items={[
					{ value: 'new_norfolk', name: 'New Norfolk' },
					{ value: 'mt_wellington', name: 'Mt Wellington' }
				]}
				bind:value={segment}
			/>
		</Label>
	</Card>
</div>

<style>
	#overlay {
		position: absolute;
		top: 0;
		left: 0;
	}
</style>
