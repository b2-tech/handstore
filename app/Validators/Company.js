const Antl = use('Antl');

class Company {
	get validateAll() {
		return true;
	}

	get rules() {
		return {
			name: 'required',
			cnpj: 'required',
		};
	}

	get messages() {
		return Antl.list('validation');
	}
}

module.exports = Company;
