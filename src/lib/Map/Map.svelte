<script lang="ts">
	import 'mapbox-gl/dist/mapbox-gl.css';
	import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
	import { onMount } from 'svelte';
	import init from './map';
	import type { MapeEventHandler } from './map.types';
	import mapboxgl from 'mapbox-gl';

	export let handlers: [string[], MapeEventHandler][] = [];
	export let markers: [number, number][] = [];

	let map: mapboxgl.Map;
	let markersOnMap: mapboxgl.Marker[] = [];

	onMount(() => {
		map = init('map');

		handlers.map(([events, handler]) => events.map((event) => map.on(event, handler)));
	});
	$: {
		// Remove existing markers
		markersOnMap.forEach((marker) => marker.remove());

		// Add new markers
		markersOnMap = markers.map(([lng, lat]) => {
			return new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
		});
	}
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
