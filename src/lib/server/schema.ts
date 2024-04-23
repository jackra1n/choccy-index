import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const products = sqliteTable('products', {
	id: integer('id').primaryKey(),
    userid: text('userid').notNull(),
	brandName: text('brand_name').notNull(),
	productName: text('product_name').notNull(),
    price: integer('price').notNull(),
    amount: integer('amount').notNull(),
    imagePath: text('imagePath').notNull(),
    rating: integer('rating').notNull()
});
