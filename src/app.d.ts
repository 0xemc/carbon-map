// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
		type Tables<T extends keyof Database['public']['Tables']> =
			Database['public']['Tables'][T]['Row'];
		type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T];
		// etc.
	}
}

export {};
