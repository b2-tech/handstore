const { test, trait } = use('Test/Suite')('Cadastro de Empresas');

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

trait('Test/ApiClient');
trait('DatabaseTransactions');
trait('Auth/Client');

test('Criando Produto', async ({ product }) => {
	const product = await Factory.model('App/Models/Product').create();
	const response = await product
		.post('/products')
		.loginVia(user, 'jwt')
		.send({
			product: 'Coca-cola 3 lts',
            codigo: '7896004731735',
            price: 6.50,
		})
		.end();

	response.assertStatus(201);
});

test('Listando todos os produtos', async ({ assert, product }) => {
	const product = await Factory.model('App/Models/Product').create();
	
	const response = await product
		.get('/products')
		.loginVia(user, 'jwt')
		.end();

	response.assertStatus(200);

	assert.deepEqual(response.body[0].id, product.id);
});

test('Listando um produto', async ({ assert, product }) => {
	const product = await Factory.model('App/Models/Product').create();
	

	const response = await product
		.get(`/products/${product.id}`)
		.loginVia(user, 'jwt')
		.end();

	response.assertStatus(200);

	assert.deepEqual(response.body.id, product.id);
});

test('Atualizando produto', async ({ assert, product }) => {
	
	const product = await Factory.model('App/Models/Product').create({
		product: 'Pepsi limao 3lts',
	});

	const response = await product
		.put(`/products/${product.id}`)
		.loginVia(user, 'jwt')
		.send({ ...company.toJSON(), product: 'Pepsi limao 3lts' })
		.end();

	response.assertStatus(200);

	assert.deepEqual(response.body.product, 'Pepsi limao 3lts');
});

test('Deletanto produto', async ({ product }) => {
	
	const response = await product
		.delete(`/products/${product.id}`)
		.loginVia(user, 'jwt')
		.end();

	response.assertStatus(204);
});
