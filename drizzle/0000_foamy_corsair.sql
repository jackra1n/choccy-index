CREATE TABLE `products` (
	`id` integer PRIMARY KEY NOT NULL,
	`userid` text NOT NULL,
	`brand_name` text NOT NULL,
	`product_name` text NOT NULL,
	`price` integer NOT NULL,
	`amount` integer NOT NULL,
	`imagePath` text NOT NULL,
	`rating` integer NOT NULL
);
