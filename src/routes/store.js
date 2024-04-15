import { writable } from "svelte/store";
import { Product } from "../models/Product";

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
        add: (product) => update(products => [...products, product]),
        remove: (product) => update(products => products.filter(p => p !== product)),
        clear: () => set([]),
    };
}

export const productsStore = createProductStore();