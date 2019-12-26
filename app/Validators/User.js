const { rule } = use('Validator');
const Validator = use('Validator');
const Database = use('Database');
const Antl = use('Antl');

const existsFn = async (data, field, message, args, get) => {
	const value = get(data, field);
	if (!value) {
		/**
		 * skip validation if value is not defined. `required` rule
		 * should take care of it.
		 */
		return;
	}

	const [table, column] = args;
	const row = await Database.table(table)
		.where(column, value)
		.first();

	if (!row) {
		throw message;
	}
};

Validator.extend('exists', existsFn);

class User {
	get validateAll() {
		return true;
	}

	get rules() {
		return {
			name: [rule('required')],
			email: [rule('required')],
			password: [rule('required')],
			permission: [rule('required'), rule('in', [1, 2])],
			company_id: [rule('required'), rule('exists', ['companies', 'id'])],
		};
	}

	get messages() {
		return Antl.list('validation');
	}
}

module.exports = User;
