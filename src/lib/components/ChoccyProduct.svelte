<script lang="ts">
    import type { productType } from "$lib/types/productType";
    import * as Card from "$lib/components/ui/card";

    export let product: productType;
</script>

<Card.Root class="max-w-[300px]">
  <Card.Header class="p-0">
    <img src={product.imagePath} alt={product.productName}
      class="w-full h-48 object-cover rounded-md" />
  </Card.Header>
  <Card.Content>
    <p class="text-xl">{product.productName}</p>
    <p class="text-slate-400">{product.brandName}</p>
    <p>Price: {product.price}</p>
    <p>Quantity: {product.amount}</p>
  </Card.Content>
</Card.Root>