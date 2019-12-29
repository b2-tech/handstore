const { test, trait } = use('Test/Suite')('Cadastro de Produtos');

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

trait('Test/ApiClient');
trait('DatabaseTransactions');
trait('Auth/Client');

test('Criando Produto', async ({ client }) => {
	const user = await Factory.model('App/Models/User').create();
	const response = await client
		.post('/products')
		.loginVia(user, 'jwt')
		.send({
			product: 'Coca-cola 3 lts',
            codigo: '7896004731735',
            price: 10,
		})
		.end();
		
	response.assertStatus(201);
});

test('Listando todos os produtos', async ({ assert, client }) => {
	const user = await Factory.model('App/Models/User').create();
	const product = await Factory.model('App/Models/Product').create();
	
	const response = await client
		.get('/products')
		.loginVia(user, 'jwt')
		.end();

	response.assertStatus(200);

	assert.deepEqual(response.body[0].id, product.id);
});

test('Listando um produto', async ({ assert, client }) => {
	const user = await Factory.model('App/Models/User').create();
	const product = await Factory.model('App/Models/Product').create();
	

	const response = await client
		.get(`/products/${product.id}`)
		.loginVia(user, 'jwt')
		.end();

	response.assertStatus(200);

	assert.deepEqual(response.body.id, product.id);
});

test('Atualizando produto', async ({ assert, client }) => {
	const user = await Factory.model('App/Models/User').create();
	const product = await Factory.model('App/Models/Product').create({
		product: 'Pepsi limao 3lts',
	});

	const response = await client
		.put(`/products/${product.id}`)
		.loginVia(user, 'jwt')
		.send({ ...product.toJSON(), product: 'Pepsi limao 3lts' })
		.end();

	response.assertStatus(200);

	assert.deepEqual(response.body.product, 'Pepsi limao 3lts');
});

test('Deletando produto', async ({ client }) => {
	const user = await Factory.model('App/Models/User').create();
	const product = await Factory.model('App/Models/Product').create();
	const response = await client
		.delete(`/products/${product.id}`)
		.loginVia(user, 'jwt')
		.end();
		
	response.assertStatus(204);
});
