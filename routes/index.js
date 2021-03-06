/**
 * This file is where you define your application routes and controllers.
 *
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 *
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 *
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 *
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 *
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

const keystone = require('keystone');
const middleware = require('./middleware');
const importRoutes = keystone.importer(__dirname);
const compression = require('compression');
const bodyParser = require('body-parser');
// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
const routes = {
  views: importRoutes('./views'),
  rest: importRoutes('./rest'),
};

// Setup Route Bindings
exports = module.exports = function (app) {
  // gzip compress responses
  app.use(compression());
  // Post body parsing
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(bodyParser.json())

  // Views
  app.get('/', routes.views.index);
  app.get('/blog/:category?', routes.views.blog);
  app.get('/blog/post/:post', routes.views.post);
  app.get('/gallery', routes.views.gallery);
  app.get('/commercial', routes.views.commercial);
  app.get('/international', routes.views.international);
  app.get('/developments', routes.views.developments);
  app.get('/investments', routes.views.investments);
  app.get('/investments/case/:slug', routes.views.caseStudy);
  app.get('/management', routes.views.management);
  app.get('/sales', routes.views.sales);
  app.get('/lettings', routes.views.lettings);
  app.get('/about', routes.views.about);
  app.get('/search', routes.rest.search);
  app.get('/property/rent/:slug', (req, res) => routes.views.property(req, res, 'rent'));
  app.get('/property/buy/:slug', (req, res) => routes.views.property(req, res, 'buy'));
  app.all('/contact', routes.views.contact);

	// NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
	// app.get('/protected', middleware.requireUser, routes.views.protected);

};
