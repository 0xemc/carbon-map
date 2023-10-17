<script lang="ts">
	import 'mapbox-gl/dist/mapbox-gl.css';
	import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
	import { onMount } from 'svelte';
	import init from './map';
	import type { MapeEventHandler } from './map.types';
	export let flyTo: [number, number] = [0, 0];
	export let handlers: [string[], MapeEventHandler][];
	export let sources: [string, mapboxgl.AnySourceData][];
	export let layers: mapboxgl.AnyLayer[] = [];

	let map: mapboxgl.Map;
	onMount(() => {
		map = init('map');
		map.on('load', () => {
			sources.map(([name, source]) => map.addSource(name, source));
			layers.map((layer) => map.addLayer(layer));
		});
		handlers.map(([events, handler]) => events.map((event) => map.on(event, handler)));
	});
	$: {
		if (map && map.isStyleLoaded() && flyTo) {
			map.flyTo({ center: flyTo, zoom: 12 });
		}
	}

	$: {
		if (map && map.isStyleLoaded()) {
			// Remove existing layers
			layers.forEach((layer) => {
				if (map.getLayer(layer.id)) {
					if (map.getSource(layer.id)) {
						map.removeSource(layer.id);
					}
					map.removeLayer(layer.id);
				}
			});

			// After all layers are removed, remove the sources
			setTimeout(() => {
				// Add sources and layers back to the map
				sources.forEach(([name, source]) => {
					if (!map.getSource(name)) {
						map?.addSource(name, source);
					}
				});
				layers.forEach((layer) => {
					if (!map.getLayer(layer.id)) {
						map.addLayer(layer);
					}
				});
			}, 0);
		}
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
