/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class UserSchema extends Schema {
	up() {
		this.create('users', table => {
			table.increments();
			table.string('name').notNullable();
			table
				.integer('companie_id')
				.unsigned()
				.references('id')
				.inTable('companies')
				.onUpdate('CASCADE');
			table
				.enu('permission', [1, 2])
				.defaultTo(1)
				.notNullable();
			table
				.string('email')
				.notNullable()
				.unique();
			table.string('password').notNullable();
			table.timestamps();
		});
	}

	down() {
		this.drop('users');
	}
}

module.exports = UserSchema;
