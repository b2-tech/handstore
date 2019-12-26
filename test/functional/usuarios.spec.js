const { test, trait } = use('Test/Suite')('Cadastro de Usuarios');

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

trait('Test/ApiClient');
trait('DatabaseTransactions');
trait('Auth/Client');

test('Criando Usuarios', async ({ client }) => {
	const company = await Factory.model('App/Models/Company').create();
	const user = await Factory.model('App/Models/User').make();
	await company.users().save(user);

	const userFake = await Factory.model('App/Models/User').make();

	const response = await client
		.post('/users')
		.loginVia(user, 'jwt')
		.send({ ...userFake.toJSON(), company_id: company.id })
		.end();

	response.assertStatus(201);
});

test('Listando todos Usuarios', async ({ assert, client }) => {
	const company = await Factory.model('App/Models/Company').create();
	const user = await Factory.model('App/Models/User').make();
	await company.users().save(user);

	const response = await client
		.get('/users')
		.loginVia(user, 'jwt')
		.end();

	response.assertStatus(200);

	assert.deepEqual(response.body[0].id, user.id);
});

test('Listando usuario', async ({ assert, client }) => {
	const company = await Factory.model('App/Models/Company').create();
	const user = await Factory.model('App/Models/User').make();
	await company.users().save(user);

	const response = await client
		.get(`/users/${user.id}`)
		.loginVia(user, 'jwt')
		.end();

	response.assertStatus(200);

	assert.deepEqual(response.body.id, user.id);
});

// test('Atualizando usuario', async ({ assert, client }) => {
// 	const company = await Factory.model('App/Models/Company').create();
// 	const user = await Factory.model('App/Models/User').create({
// 		name: 'Nome antigo',
// 	});

// 	const response = await client
// 		.put(`/users/${user.id}`)
// 		.loginVia(user, 'jwt')
// 		.send({ ...company.toJSON(), name: 'Nome novo' })
// 		.end();

// 	response.assertStatus(200);

// 	assert.deepEqual(response.body.name, 'Nome novo');
// });

// test('Deletanto Empresa', async ({ client }) => {
// 	const company = await Factory.model('App/Models/Company').create();
// 	const user = await Factory.model('App/Models/User').create();

// 	const response = await client
// 		.delete(`/users/${user.id}`)
// 		.loginVia(user, 'jwt')
// 		.end();

// 	response.assertStatus(204);
// });
