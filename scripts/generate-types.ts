import { execSync } from 'child_process';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectId = process.env.VITE_SUPABASE_PROJECT_ID;

if (!projectId) {
	console.error('SUPABASE_PROJECT_ID environment variable is not set');
	process.exit(1);
}

const type_path = resolve(__dirname, '../src/lib/types/supabase.types.ts');

const command = `rm -f ${type_path} && npx supabase gen types typescript --project-id ${projectId} --schema public > ${type_path}`;

execSync(command, { stdio: 'inherit' });
