<script lang="ts">
	import type { Slider as SliderPrimitive } from 'bits-ui';
	import { enhance } from '$app/forms';
	import * as Card from '$lib/components/ui/card';
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import Slider from '$lib/components/ui/slider/slider.svelte';
	import ChoccyProduct from '$lib/components/ChoccyProduct.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let rating: SliderPrimitive.Props['value'] = [5];
</script>

<main class="flex justify-center">
	<div class="flex w-full flex-col p-4 lg:flex-row">
		<Card.Root class="w-full min-w-80 lg:mr-4 lg:max-w-[460px]">
			<form method="POST" action="?/add" enctype="multipart/form-data" use:enhance>
				<Card.Header>
					<Card.Title>New Entry</Card.Title>
					<Card.Description>Add a new chocolate spread product</Card.Description>
				</Card.Header>
				<Card.Content class="grid gap-4">
					<div class="grid gap-2">
						<Label for="brandName">Brand name</Label>
						<Input id="brandName" name="brandName" placeholder="Brand name of your product" />
					</div>
					<div class="grid gap-2">
						<Label for="productName">Product name</Label>
						<Input id="productName" name="productName" placeholder="Product name of your product" />
					</div>
					<div class="grid gap-2">
						<Label for="price">Price</Label>
						<Input id="price" name="price" type="number" step="0.01" placeholder="0.00" />
					</div>
					<div class="grid gap-2">
						<Label for="amount">Amount</Label>
						<Input
							id="amount"
							name="amount"
							type="number"
							min="0"
							placeholder="Amount in the container, in grams"
						/>
					</div>
					<div class="grid gap-2">
						<Label for="image">Image</Label>
						<Input id="image" name="image" type="file" accept="image/png, image/jpeg, image/webp" />
					</div>
					<div class="grid gap-2 py-2">
						<div class="flex items-center justify-between">
							<Label for="ratingSlider">Rating</Label>
							<span
								class="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border"
							>
								{rating}
							</span>
						</div>
						<Input id="ratingInput" name="rating" type="hidden" bind:value={rating} />
						<Slider id="ratingSlider" bind:value={rating} min={1} max={10} step={1} />
					</div>
				</Card.Content>
				<Card.Footer>
					<Button class="w-full" type="submit">Add product</Button>
				</Card.Footer>
			</form>
		</Card.Root>

		<Card.Root class="mt-4 w-full min-w-[320px] lg:mt-0 lg:w-[80%]">
			<Card.Header>
				<Card.Title>Entries</Card.Title>
				<Card.Description>Overview of all entries</Card.Description>
			</Card.Header>
			<Card.Content>
				{#if data.products.length > 0}
					<ul class="grid gap-4">
						{#each data.products as product (product.id)}
							<li class="grid gap-2">
								<ChoccyProduct {product} />
							</li>
						{/each}
					</ul>
				{:else}
					<h1 class="text-4xl text-gray-300">There are no entries yet</h1>
				{/if}
			</Card.Content>
		</Card.Root>
	</div>
</main>
