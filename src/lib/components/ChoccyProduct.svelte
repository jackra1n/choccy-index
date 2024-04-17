<script lang="ts">
    import { Product } from "$lib/models/Product";
    import * as Card from "$lib/components/ui/card";

    export let product: Product;
</script>

<Card.Root>
  <Card.Header class="p-0">
    <img src={product.image} alt={product.productName} class="w-full h-48 object-cover" />
  </Card.Header>
  <Card.Content>
    <p class="text-xl">{product.productName}</p>
    <p class="text-slate-400">{product.brandName}</p>
    <p>Price: {product.price}</p>
    <p>Quantity: {product.quantity}</p>
  </Card.Content>
</Card.Root>