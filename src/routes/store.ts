import { writable } from "svelte/store";
import { Product } from "$lib/models/Product";

function getInitialData() {
    if (typeof window !== 'undefined') {
        const nutella = new Product('Ferrero', 'Nutella', 3.99, 400, null, 5);
        const data = window.localStorage.getItem('products');
        return data ? JSON.parse(data) : [nutella];
    }
    return [];
}

function createProductStore() {
    const { subscribe, set, update } = writable(getInitialData());

    return {
        subscribe,
        add: (product: Product) => update(products => {
            const updatedProducts = [...products, product];
            if (typeof window !== 'undefined') {
                window.localStorage.setItem('products', JSON.stringify(updatedProducts))
            }
        }),
        remove: (product: Product) => update(products => products.filter((p: Product) => p !== product)),
        clear: () => set([]),
    };
}

export const productsStore = createProductStore();