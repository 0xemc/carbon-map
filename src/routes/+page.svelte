<script lang="ts">
	import Map from '$lib/Map/Map.svelte';
	import { Card } from 'flowbite-svelte';
	import type { MapEvent, MapMetrics } from '$lib/Map/map.types';
	import numeral from 'numeral';

	const DEFAULT_METRICS: MapMetrics = {
		trees: '-',
		area: '-',
		coverage: 0,
		carbon: 0
	};

	let metrics = DEFAULT_METRICS;

	const handleUpdate = (e: MapEvent) => {
		const coords = e.features?.at(0)?.geometry.coordinates;
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
</script>

<Map
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
	</Card>
</div>

<style>
	#overlay {
		position: absolute;
		top: 0;
		left: 0;
	}
</style>
