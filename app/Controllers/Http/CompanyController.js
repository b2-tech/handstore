/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
/** @type {import('@adonisjs/lucid/src/Schema')} */
const Company = use('App/Models/Company');
/**
 * Resourceful controller for interacting with companies
 */
class CompanyController {
	async index() {
		const company = await Company.query().fetch();

		return company;
	}

	async show({ params }) {
		const company = await Company.find(params.id);

		return company;
	}

	async store({ request, response }) {
		const data = request.only(['name', 'cnpj']);

		const company = await Company.create(data);

		return response.status(201).json(company);
	}

	async update({ request, params }) {
		const data = request.only(['name', 'cnpj']);

		const company = await Company.find(params.id);

		company.merge(data);

		await company.save();

		return company;
	}

	async destroy({ params }) {
		const company = await Company.find(params.id);

		await company.delete();
	}
}

module.exports = CompanyController;
