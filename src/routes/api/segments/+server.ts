import { json, type RequestHandler } from '@sveltejs/kit';

import { createClient } from '@supabase/supabase-js';
import type { Database } from '$lib/types/supabase.types';

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient<Database>(url, key, {
	auth: {
		persistSession: false
	}
});

export const GET: RequestHandler = async () => {
	try {
		console.debug('Supabase fetch start');
		console.time('supabase-query');
		const { data, error } = await supabase.from('segments').select('*');
		console.debug('Supabase fetch end');
		console.timeEnd('supabase-query');
		if (error) {
			console.error('Error', error);
			throw error;
		}
		return json(data);
	} catch (error) {
		console.debug('Fetch on / route 3');
		console.error('Error: ', error);
	}
	return json({});
};
