<script>
	import '../app.pcss';
	import { page } from '$app/stores';
	import * as Avatar from '$lib/components/ui/avatar';
	import { SignIn } from '@auth/sveltekit/components';
	import { signOut } from '@auth/sveltekit/client';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
</script>

<header class="px-4 pt-4">
	<div
		class="flex h-[60px] min-w-[320px] items-center justify-between rounded-lg border p-3 shadow-sm"
	>
		<div>Choccy-Index</div>
		<div>
			{#if $page.data.session === null}
				<SignIn>
					<span slot="submitButton">Sign In</span>
				</SignIn>
			{:else}
				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						<Avatar.Root>
							<Avatar.Image
								src={$page.data.session?.user?.image}
								alt={$page.data.session?.user?.name}
							/>
							<Avatar.Fallback>{$page.data.session?.user?.name}</Avatar.Fallback>
						</Avatar.Root>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content>
						<DropdownMenu.Group>
							<DropdownMenu.Label>{$page.data.session?.user?.name}</DropdownMenu.Label>
							<DropdownMenu.Item>
								Email: {$page.data.session?.user?.email}
							</DropdownMenu.Item>
							<DropdownMenu.Item>
								<button on:click={signOut}>Signout</button>
							</DropdownMenu.Item>
						</DropdownMenu.Group>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			{/if}
		</div>
	</div>
</header>

<slot></slot>
