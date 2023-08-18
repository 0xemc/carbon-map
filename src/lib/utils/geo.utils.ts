import type { BoundingBox } from '$lib/types/geo.types';

export const toGeoJson = (bb: BoundingBox): mapboxgl.AnySourceData => ({
	type: 'geojson',
	data: {
		type: 'Feature',
		geometry: {
			type: 'Polygon',
			coordinates: [bb]
		}
	}
});
