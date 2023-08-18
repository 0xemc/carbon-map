import type { RequestHandler } from '@sveltejs/kit';

import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(url, key);

export const GET: RequestHandler = async () => {
	const { data, error } = await supabase.from('segments').select('*');

	if (error) console.log('Error: ', error);

	return new Response(JSON.stringify(data));
};