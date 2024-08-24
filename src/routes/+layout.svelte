<script>
	import '../app.pcss';
	import { page } from "$app/stores"
	import * as Avatar from "$lib/components/ui/avatar";
	import { SignIn } from "@auth/sveltekit/components";
	import { signOut } from '@auth/sveltekit/client';
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
</script>

<header class="w-100 p-4">
	<div class="h-[60px] p-3 flex items-center justify-between border shadow-sm rounded-lg">
		<div>
			Header
		</div>
		<div>
			{#if $page.data.session === null}
				<SignIn>
					<span slot="submitButton">Sign In</span>
				</SignIn>
			{:else}
			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					<Avatar.Root>
						<Avatar.Image src={$page.data.session?.user?.image} alt={$page.data.session?.user?.name} />
						<Avatar.Fallback>{$page.data.session?.user?.name}</Avatar.Fallback>
					</Avatar.Root>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content>
				  <DropdownMenu.Group>
					  <DropdownMenu.Label>{$page.data.session?.user?.name}</DropdownMenu.Label>
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
