<script>
	import Map from '$lib/Map/Map.svelte';
	import { Card } from 'flowbite-svelte';
</script>

<Map />
<div id="overlay" class="p-8">
	<Card class="flex space-y-6">
		<hr class="w-6" />
		<div class="flex">
			<h2 class="text-6xl text-white">
				20.4<sub class="text-base">T</sub>
			</h2>
			<sub class="text-xs justify-end align-bottom">CO2/m2</sub>
		</div>
		<hr class="border-" />
		<div class="space-y-4">
			<h4 class="text-sm text font-semibold tracking-tight text-[12px]">VEGETATION</h4>
			<div class="grid grid-cols-2">
				<span class="flex text-white space-x-2"
					><img src="icons/leaf.svg" alt="leaf" />
					<p>73%</p></span
				>
				<span class="flex text-white space-x-2"
					><img src="icons/tree.svg" alt="tree" />
					<p>2,173</p></span
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
					<p>21,31 m<sup>2</sup></p>
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
