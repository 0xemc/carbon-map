import mapboxgl, { Map, type MapboxOptions } from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';

mapboxgl.accessToken =
	'pk.eyJ1IjoibWljY29sbGlucyIsImEiOiJja3NuMnRrNzkxY2V2MndwYzBueGlpM3d3In0.cMsNf8d1KlEQnvXRVvG3ig';

const config: Partial<MapboxOptions> = {
	// Choose from Mapbox's core styles, or make your own style with Mapbox Studio
	// style: 'mapbox://styles/mapbox/light-v11', // style URL
	style: 'mapbox://styles/mapbox/satellite-v9', // style URL
	center: [146.8087, -42.0409], // starting position
	zoom: 7 // starting zoom
};

const init = (container: MapboxOptions['container']) => {
	const map = new Map({
		...config,
		container
	});

	const draw = new MapboxDraw({
		displayControlsDefault: false,
		// Select which mapbox-gl-draw control buttons to add to the map.
		controls: {
			polygon: true,
			trash: true
		},
		// Set mapbox-gl-draw to draw by default.
		// The user does not have to click the polygon control button first.
		defaultMode: 'draw_polygon'
	});
	map.addControl(draw);

	return map;
};

export default init;
