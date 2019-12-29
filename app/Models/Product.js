/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Product extends Model {
	product() {
		return this.hasMany('App/Models/Product');
	 }
}

module.exports = Product;