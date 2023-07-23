import type { RequestHandler } from '@sveltejs/kit';
import numeral from 'numeral';
import * as turf from '@turf/turf';

export const POST: RequestHandler = async ({ request }) => {
	const args = {
		status: 200,
		headers: {
			'Content-Type': 'application/json'
		}
	};

	const coords = await request.json();

	function formatArea(area: number) {
		if (area >= 1000) {
			return numeral(area / 1000).format('0,0.00') + ' km²';
		} else {
			return numeral(area).format('0,0.00') + ' m²';
		}
	}

	function computeArea(coords: any) {
		const data = turf.polygon(coords);
		const area = turf.area(data);
		return formatArea(area);
	}

	const result: any = {
		trees: Math.floor(Math.random() * 1000),
		area: computeArea(coords)
	};
	return new Response(JSON.stringify(result), args);
};
