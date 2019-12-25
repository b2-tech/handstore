const { test, trait } = use('Test/Suite')('Esqueceu a Senha');
const { subHours, subMinutes, format } = require('date-fns');

const Mail = use('Mail');
const Hash = use('Hash');
const Database = use('Database');

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

trait('Test/ApiClient');
trait('DatabaseTransactions');

test('Enviar um email com as instruções de recuperação de senha', async ({
	assert,
	client,
}) => {
	Mail.fake();

	const email = 'melqui@b2tech.com.br';

	const user = await Factory.model('App/Models/User').create({ email });

	await client
		.post('/forgot')
		.send({ email })
		.end();

	const token = await user.tokens().first();

	const recentEmail = Mail.pullRecent();

	assert.equal(recentEmail.message.to[0].address, email);

	assert.include(token.toJSON(), {
		type: 'forgotpassword',
	});

	Mail.restore();
});

test('Resetando a senha', async ({ assert, client }) => {
	const email = 'melqui@b2tech.com.br';

	const user = await Factory.model('App/Models/User').create({ email });
	const userToken = await Factory.model('App/Models/Token').make();

	await user.tokens().save(userToken);

	await client
		.post('/reset')
		.send({
			token: userToken.token,
			password: '12345678',
			password_confirmation: '12345678',
		})
		.end();

	await user.reload();
	const checkPassword = await Hash.verify('12345678', user.password);

	assert.isTrue(checkPassword);
});

test('Não poder resetar a senha depois de 2 horas', async ({ client }) => {
	const email = 'melqui@b2tech.com.br';

	const user = await Factory.model('App/Models/User').create({ email });
	const userToken = await Factory.model('App/Models/Token').make();

	await user.tokens().save(userToken);

	const dateWithSub = format(
		subMinutes(subHours(new Date(), 2), 10),
		'yyyy-MM-dd HH:ii:ss'
	);

	await Database.table('tokens')
		.where('token', userToken.token)
		.update('created_at', dateWithSub);

	await userToken.reload();

	const response = await client
		.post('/reset')
		.send({
			token: userToken.token,
			password: '12345678',
			password_confirmation: '12345678',
		})
		.end();

	response.assertStatus(400);
});
