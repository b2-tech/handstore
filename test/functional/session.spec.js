const { test, trait } = use('Test/Suite')('Session');

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

trait('Test/ApiClient');

test('it should return JWT token shen session created', async ({ assert, client }) => {
	const sessionPayload = {
		email: 'melqui@b2tech.com.br',
		password: '12345678'
	}

	const user = await Factory
		.model('App/Models/User')
		.create(sessionPayload);

	const response = await client
		.post('/sessions')
		.send({
			email: 'melqui@b2tech.com.br',
			password: '12345678'
		})
		.end()

	response.assertStatus(200);
	assert.exists(response.body.token);
});
