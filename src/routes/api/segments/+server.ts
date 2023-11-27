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
	console.debug('Fetch on / route');
	try {
		const { data, error } = await supabase.from('segments').select('*');
		console.debug('Fetch on / route 2');
		if (error) throw error;
		console.debug('Fetch on / route 3');
		return json(data);
	} catch (error) {
		console.debug('Fetch on / route 3');
		console.error('Error: ', error);
	}
	return json({});
};
