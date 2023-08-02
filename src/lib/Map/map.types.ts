export type MapEvent = (mapboxgl.MapLayerMouseEvent | mapboxgl.MapLayerTouchEvent) &
	mapboxgl.EventData;
export type MapeEventHandler = (ev: MapEvent) => void;
