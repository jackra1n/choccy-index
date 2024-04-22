<script>
	import '../app.pcss';
	import * as Avatar from "$lib/components/ui/avatar";
</script>

<header class="w-100 p-4">
	<div class="h-[60px] p-3 flex items-center justify-between border shadow-sm rounded-lg">
		<div>
			Header
		</div>
		<div>
			<a href="https://github.com/jackra1n">
				<Avatar.Root>
					<Avatar.Image src="https://github.com/jackra1n.png" alt="@shadcn" />
					<Avatar.Fallback>User</Avatar.Fallback>
				</Avatar.Root>
			</a>
		</div>
	</div>
</header>

<slot></slot>
