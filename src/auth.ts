import { SvelteKitAuth } from '@auth/sveltekit';
import GitHub from '@auth/sveltekit/providers/github';
import Discord from '@auth/sveltekit/providers/discord';

export const { handle, signIn, signOut } = SvelteKitAuth({
	providers: [GitHub, Discord]
});
