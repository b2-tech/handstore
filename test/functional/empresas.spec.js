const { test, trait } = use('Test/Suite')('Cadastro de Empresas');

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

trait('Test/ApiClient');
trait('DatabaseTransactions');
trait('Auth/Client');

test('Criando Empresas', async ({ client }) => {
	const user = await Factory.model('App/Models/User').create();
	const response = await client
		.post('/companies')
		.loginVia(user, 'jwt')
		.send({
			name: 'Compania de Aguas',
			cnpj: '27.644.305/0001-92',
		})
		.end();

	response.assertStatus(201);
});

test('Listando todas Empresas', async ({ assert, client }) => {
	const user = await Factory.model('App/Models/User').create();
	const company = await Factory.model('App/Models/Company').create();

	const response = await client
		.get('/companies')
		.loginVia(user, 'jwt')
		.end();

	response.assertStatus(200);

	assert.deepEqual(response.body[0].id, company.id);
});

test('Listando Empresa', async ({ assert, client }) => {
	const user = await Factory.model('App/Models/User').create();
	const company = await Factory.model('App/Models/Company').create();

	const response = await client
		.get(`/companies/${company.id}`)
		.loginVia(user, 'jwt')
		.end();

	response.assertStatus(200);

	assert.deepEqual(response.body.id, company.id);
});

test('Atualizando Empresa', async ({ assert, client }) => {
	const user = await Factory.model('App/Models/User').create();
	const company = await Factory.model('App/Models/Company').create({
		name: 'Empresa Antiga',
	});

	const response = await client
		.put(`/companies/${company.id}`)
		.loginVia(user, 'jwt')
		.send({ ...company.toJSON(), name: 'Empresa Nova' })
		.end();

	response.assertStatus(200);

	assert.deepEqual(response.body.name, 'Empresa Nova');
});

test('Deletanto Empresa', async ({ client }) => {
	const user = await Factory.model('App/Models/User').create();
	const company = await Factory.model('App/Models/Company').create({
		name: 'Empresa Antiga',
	});

	const response = await client
		.delete(`/companies/${company.id}`)
		.loginVia(user, 'jwt')
		.end();

	response.assertStatus(204);
});
