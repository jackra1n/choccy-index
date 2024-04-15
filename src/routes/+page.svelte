<script lang="ts">
    import type { Slider as SliderPrimitive } from "bits-ui";
    import * as Card from "$lib/components/ui/card";
    import Button from "$lib/components/ui/button/button.svelte";
    import Input from "$lib/components/ui/input/input.svelte";
    import Label from "$lib/components/ui/label/label.svelte";
    import Slider from "$lib/components/ui/slider/slider.svelte";
    import { Product } from "../models/Product";
    import { productsStore } from "./store";

    let brandName: string = '';
    let productName: string = '';
    let price: number = 0;
    let quantity: number = 0;
    let image: File | null = null;
    export let rating: SliderPrimitive.Props["value"] = [5]; 
    
    function addProduct() {
        if (!brandName || !productName || price < 0 || quantity <= 0 || !rating) {
            console.log('Please fill in all fields');
            return;
        }
        
        const product = new Product(brandName, productName, price, quantity, image, rating[0]);
        productsStore.add(product);
        localStorage.setItem('products', JSON.stringify($productsStore));
    }
    
</script>


<main class="m-12 flex justify-center">
    <div class="w-full flex flex-col lg:flex-row">
        <Card.Root class="min-w-80 m-4 w-full lg:max-w-[460px]">
            <Card.Header>
                <Card.Title>New Entry</Card.Title>
                <Card.Description>Add a new chocolate spread product</Card.Description>
            </Card.Header>
            <Card.Content class="grid gap-4">
                <div class="grid gap-2">
                    <Label for="name">Brand name</Label>
                    <Input bind:value={brandName} id="name" placeholder="Brand name of your product" />
                </div>
                <div class="grid gap-2">
                    <Label for="name">Product name</Label>
                    <Input bind:value={productName} id="name" placeholder="Product name of your product" />
                </div>
                <div class="grid gap-2">
                    <Label for="name">Price</Label>
                    <Input bind:value={price} id="name" placeholder="0.00" />
                </div>
                <div class="grid gap-2">
                    <Label for="name">Amount</Label>
                    <Input bind:value={quantity} id="name" type="number" min="0" placeholder="Amount in a container in grams" />
                </div>
                <div class="grid gap-2">
                    <Label for="name">Image</Label>
                    {#if image}
                        <!-- svelte-ignore a11y-img-redundant-alt -->
                        has image
                        <!-- <img src={URL.createObjectURL(image)} alt="Product image" class="w-full h-40 object-cover rounded-md" /> -->
                    {/if}
                </div>
                <div class="grid gap-2 py-2">
                    <div class="flex items-center justify-between">
                        <Label for="name">Rating</Label>
                        <span
                            class="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border"
                        >
                            {rating}
                        </span>
                    </div>
                    <Slider bind:value={rating} min={1} max={10} step={1}/>
                </div>
            </Card.Content>
            <Card.Footer>
                <Button class="w-full" on:click={addProduct}>
                    Add product
                </Button>
            </Card.Footer>
        </Card.Root>

        <Card.Root class="m-4 w-full lg:w-[80%] min-w-[600px]"> 
            <Card.Header>
                <Card.Title>Entries</Card.Title>
                <Card.Description>Overview of all entries</Card.Description>
            </Card.Header>
            <Card.Content>
                {#if $productsStore.length > 0}
                    <ul class="grid gap-4">
                        {#each $productsStore as product}
                            <li class="grid gap-2">
                                <div class="grid gap-2">
                                    <Label for="name">Brand name</Label>
                                    <Input id="name" value={product.brandName} readonly />
                                </div>
                                <div class="grid gap-2">
                                    <Label for="name">Product name</Label>
                                    <Input id="name" value={product.productName} readonly />
                                </div>
                                <div class="grid gap-2">
                                    <Label for="name">Price</Label>
                                    <Input id="name" value={product.price} readonly />
                                </div>
                                <div class="grid gap-2">
                                    <Label for="name">Amount</Label>
                                    <Input id="name" value={product.quantity} readonly />
                                </div>
                                <div class="grid gap-2">
                                    <Label for="name">Image</Label>
                                    <Input id="name" value={product.image} readonly />
                                </div>
                                <div class="grid gap-2 py-2">
                                    <div class="flex items-center justify-between">
                                        <Label for="name">Rating</Label>
                                        <span
                                            class="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border"
                                        >
                                            {product.rating}
                                        </span>
                                    </div>
                                </div>
                            </li>
                        {/each}
                    </ul>
                {:else}
                    <h1 class="text-4xl">There are no entries yet</h1>
                {/if}
            </Card.Content>
        </Card.Root>
    </div>
</main>
