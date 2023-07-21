<script>
	import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
	import { onMount } from 'svelte';

	mapboxgl.accessToken =
		'pk.eyJ1IjoibWljY29sbGlucyIsImEiOiJja3NuMnRrNzkxY2V2MndwYzBueGlpM3d3In0.cMsNf8d1KlEQnvXRVvG3ig';

	onMount(() => {
		new mapboxgl.Map({
			container: 'map', // container ID
			// Choose from Mapbox's core styles, or make your own style with Mapbox Studio
			style: 'mapbox://styles/mapbox/light-v11', // style URL
			center: [-68.137343, 45.137451], // starting position
			zoom: 5 // starting zoom
		});
	});
</script>

<div id="map" />

<style>
	#map {
		height: 100vh;
	}
</style>
