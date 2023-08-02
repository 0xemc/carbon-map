import type { RequestHandler } from '@sveltejs/kit';
import numeral from 'numeral';
import * as turf from '@turf/turf';
import { pipe } from 'fp-ts/lib/function';
import pg from 'pg';

const POST_GRES_URL = import.meta.env.VITE_API_NEON_URL;

const pool = new pg.Pool({
	ssl: {
		rejectUnauthorized: false
	},
	connectionString: `${POST_GRES_URL}?sslmode=require`
});

// A rough estimate of carbon locked in an area of a forest **
const CO2_M2_ESTIMATE = 400;

function formatArea(area: number) {
	if (area >= 1000) {
		return numeral(area / 1000).format('0,0.00') + ' km²';
	} else {
		return numeral(area).format('0,0.00') + ' m²';
	}
}

export type Tree = {
	geom: string;
	image_path: string;
	lat: number;
	lon: number;
	score: number;
};

export type FetchMetricsResponse = {
	carbon: number;
	area: string;
	coverage: number;
	trees: Tree[];
};

export const POST: RequestHandler = async ({ request }) => {
	const args = {
		status: 200,
		headers: {
			'Content-Type': 'application/json'
		}
	};
	const coords: [number, number][][] = await request.json();

	const polygon = coords
		.at(0)
		?.map((coord) => coord.join(' '))
		.join(', ');

	const query = `
		SELECT * FROM trees
		WHERE ST_Within(geom, ST_GeomFromText('POLYGON((${polygon}))', 4326));`;

	const db_resp = await pool.query(query);

	const seed = random(0.3, 0.6);
	const area = pipe(coords, turf.polygon, turf.area);
	const coverage = (seed * 100).toFixed(1);
	const trees = db_resp.rows;
	const carbon = (CO2_M2_ESTIMATE * area) / Number(coverage) / 1000; //Divide by 1000 to get from kg to tons

	const result = {
		carbon,
		coverage,
		trees,
		area: formatArea(area)
	};
	return new Response(JSON.stringify(result), args);
};

function random(min: number, max: number) {
	return Math.random() * (max - min) + min;
}
