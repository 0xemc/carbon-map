<script>
	import 'mapbox-gl/dist/mapbox-gl.css';
	import { onMount } from 'svelte';
	import init from './index';
	let map;
	onMount(() => init('map'));
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
