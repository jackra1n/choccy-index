import type { PageServerLoad, Actions } from './$types';
import { db } from '$lib/server/db';
import * as schema from '$lib/server/schema';
import { sql } from 'drizzle-orm';


export const load = (async ({cookies}) => {
    const user = cookies.get('userid');
    const products = await db
        .select()
        .from(schema.products)
        .where(sql`${schema.products.userid} = ${user}`);


    return {
        products
    };

}) satisfies PageServerLoad;


export const actions: Actions = {
    add: async ({cookies, request}) => {
        const userid = cookies.get('userid');
        if (!userid) {
            return {
                status: 401,
                body: 'Unauthorized'
            };
        }

        const data = await request.formData();
        console.log(data);

        const brandName = data.get('brandName') as string;
        const productName = data.get('productName') as string;
        const price = Number(data.get('price')) || 0;
        const amount = Number(data.get('amount')) || 0;
        const rating = Number(data.get('rating')) || 0;

        if (!brandName || !productName || price <= 0 || amount <= 0) {
            return {
                status: 400,
                body: 'Invalid data'
            };
        }

        const image = data.get('image') as File;
        if (!image) {
            return {
                status: 400,
                body: 'No image provided'
            };
        }
        const imagePath = `static/images/${userid}/${image.name}`;
        
        await db.insert(schema.products).values({
            userid,
            brandName,
            productName,
            price,
            amount,
            imagePath,
            rating
        });

        await Bun.write(imagePath, image);
        return {
            status: 200,
            body: 'Product added'
        };
    }
};