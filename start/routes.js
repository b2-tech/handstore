/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.post('/sessions', 'SessionController.store').validator('Session');

Route.post('/forgot', 'ForgotPasswordController.store').validator('Forgot');
Route.post('/reset', 'ResetPasswordController.store').validator('Reset');

Route.group(() => {
	Route.get('/companies', 'CompanyController.index');
	Route.get('/companies/:id', 'CompanyController.show');
	Route.post('/companies', 'CompanyController.store').validator('Company');
	Route.put('/companies/:id', 'CompanyController.update').validator('Company');
	Route.delete('/companies/:id', 'CompanyController.destroy');

	Route.get('/users', 'UserController.index');
	Route.get('/users/:id', 'UserController.show');
	Route.post('/users', 'UserController.store').validator('User');
	Route.put('/users/:id', 'UserController.update').validator('User');
	Route.delete('/users/:id', 'UserController.destroy');

	Route.get('/products', 'ProductController.index');
	Route.get('/products/:id', 'ProductController.show');
	Route.post('/products', 'ProductController.store');
	Route.put('/products/:id', 'ProductController.update');
	Route.delete('/products/:id', 'ProductController.destroy');
}).middleware('auth');

Route.get('/', () => {
	return { greeting: 'Hello world in JSON' };
});
