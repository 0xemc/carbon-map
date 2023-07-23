<script lang="ts">
	import 'mapbox-gl/dist/mapbox-gl.css';
	import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
	import { onMount } from 'svelte';
	import init from './map';
	import type { MapeEventHandler } from './map.types';

	export let handlers: [string[], MapeEventHandler][] = [];

	onMount(() => {
		const map = init('map');
		handlers.map(([events, handler]) => events.map((event) => map.on(event, handler)));
	});
</script>

<div id="map" />

<style>
	#map {
		position: absolute;
		top: 0;
		bottom: 0;
		width: 100%;
	}
</style>
