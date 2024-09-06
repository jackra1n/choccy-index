import { fail } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import * as schema from '$lib/server/schema';
import { sql } from 'drizzle-orm';
import { mkdir } from 'node:fs/promises';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	let id = cookies.get('userid');

	if (!id) {
		id = crypto.randomUUID();
		cookies.set('userid', id, { path: '/' });
	}

	const products = await db
		.select()
		.from(schema.products)
		.where(sql`${schema.products.userid} = ${id}`);

	return {
		products
	};
};

export const actions: Actions = {
	add: async ({ cookies, request }) => {
		const userid = cookies.get('userid');
		if (!userid) {
			return fail(401, { error: 'Unauthorized' });
		}

		const data = await request.formData();

		const brandName = data.get('brandName') as string;
		const productName = data.get('productName') as string;
		const price = Number(data.get('price')) || 0;
		const amount = Number(data.get('amount')) || 0;
		const rating = Number(data.get('rating')) || 0;

		if (!brandName || !productName || price <= 0 || amount <= 0) {
			return fail(400, { error: 'Invalid data' });
		}

		const image = data.get('image') as File;
		if (!image) {
			return fail(400, { error: 'No image provided' });
		}

		const uploadDir = `static/images/${userid}`;
		const imagePath = `${uploadDir}/${image.name}`;

		await mkdir(uploadDir, { recursive: true });

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
	}
};
