/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

Factory.blueprint('App/Models/User', (faker, i, data = {}) => {
	return {
		name: faker.name(),
		email: faker.email(),
		password: faker.string(),
		permission: 1,
		company_id: 1,
		...data,
	};
});

Factory.blueprint('App/Models/Token', (faker, i, data = {}) => {
	return {
		type: data.type || 'refreshtoken',
		token: faker.string({ length: 20 }),
		...data,
	};
});

Factory.blueprint('App/Models/Company', (faker, i, data = {}) => {
	return {
		name: faker.name(),
		cnpj: faker.integer({ length: 14 }),
		...data,
	};
});

Factory.blueprint('App/Models/Product', (faker, i, data = {}) => {
	return {
		product: faker.string(),
		codigo: faker.string(),
		price: faker.integer({ length: 3}),
		...data,
	};
});

