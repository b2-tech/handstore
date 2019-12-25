class Company {
	get rules() {
		return {
			name: 'required',
			cnpj: 'required',
		};
	}
}

module.exports = Company;
