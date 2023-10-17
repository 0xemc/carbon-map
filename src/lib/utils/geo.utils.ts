export const toGeoJson = (data: any): mapboxgl.AnySourceData => ({
	type: 'geojson',
	data
});
