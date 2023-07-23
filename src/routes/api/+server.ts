import type { RequestHandler } from '@sveltejs/kit';
import numeral from 'numeral';
import * as turf from '@turf/turf';
import { pipe } from 'fp-ts/lib/function';

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
	const seed = random(0.3, 0.6);
	const area = pipe(coords, turf.polygon, turf.area);
	const coverage = (seed * 100).toFixed(1);
	const trees = numeral(seed * area).format('0,0');

	const result = {
		coverage,
		trees,
		area: formatArea(area)
	};
	return new Response(JSON.stringify(result), args);
};

function random(min: number, max: number) {
	return Math.random() * (max - min) + min;
}
