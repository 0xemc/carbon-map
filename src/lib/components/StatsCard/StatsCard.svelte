<script lang="ts">
	import { Card, Label, Select } from 'flowbite-svelte';
	import numeral from 'numeral';
	import type { FetchMetricsResponse } from '../../../routes/api/+server';

	let segment: string;
	export let metrics: FetchMetricsResponse;

	function formatCarbon(carbon: number) {
		if (carbon >= 1000) {
			return numeral(carbon / 1000).format('0,0');
		} else {
			return numeral(carbon).format('0,0');
		}
	}
</script>

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
