import type { PageServerLoad, Actions } from './$types';
import { Product } from '$lib/models/Product';

export const load = (async () => {
	return {};
}) satisfies PageServerLoad;


export const actions: Actions = {
    add: async ({request}) => {
        const data = await request.formData();

        const brandName = data.get('brandName') as string;
        const productName = data.get('productName') as string;
        const price = Number(data.get('price')) || 0;
        const amount = Number(data.get('amount')) || 0;
        const rating = Number(data.get('rating')) || 0;

        const image = data.get('image') as File;
        if (!image) {
            return {
                status: 400,
                body: 'No image provided'
            };
        }

        const imagePath = `static/images/${image.name}`;
        await Bun.write(imagePath, image);


        const product = new Product(brandName, productName, price, amount, image, rating);
        console.log(product);
    }
};