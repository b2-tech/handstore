/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
/** @type {import('@adonisjs/lucid/src/Schema')} */
const User = use('App/Models/User');
/**
 * Resourceful controller for interacting with companies
 */
class UserController {
	async index() {
		const user = await User.query()
			.with('companies')
			.fetch();

		return user;
	}

	async show({ params }) {
		const user = await User.find(params.id);

		return user;
	}

	async store({ request, response }) {
		const data = request.only([
			'name',
			'email',
			'password',
			'permission',
			'companie_id',
		]);
		const user = await User.create(data);

		return response.status(201).json(user);
	}

	async update({ request, params }) {
		const data = request.only([
			'name',
			'email',
			'password',
			'permission',
			'companie_id',
		]);

		const user = await User.find(params.id);

		user.merge(data);

		await user.save();

		return user;
	}

	async destroy({ params }) {
		const user = await User.find(params.id);

		await user.delete();
	}
}

module.exports = UserController;
