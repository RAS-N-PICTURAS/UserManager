create table users (
	id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
	name VARCHAR(200),
	email VARCHAR(200),
	password_hash VARCHAR(200),
	type VARCHAR(13)
);


