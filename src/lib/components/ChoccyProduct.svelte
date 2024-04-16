<script lang="ts">
    import { Product } from "$lib/models/Product";
    import Input from "$lib/components/ui/input/input.svelte";
    import Label from "$lib/components/ui/label/label.svelte";

    export let product: Product;
</script>
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