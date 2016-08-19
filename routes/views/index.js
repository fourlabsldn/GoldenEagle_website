const keystone = require('keystone');

exports = module.exports = function (req, res) {
	const view = new keystone.View(req, res);
	const locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';
	locals.data = {};

	// Load page content from database
	view.on('init', next => {
		// Add loaded content to 'locals' to make it accessible to the view
		Promise.all([
			keystone.list('Home').getAll(),
			keystone.list('Property').getFeatured(),
		])
		.then(([homeContent, featuredProperties]) => {
			locals.data = homeContent[0];
			locals.featuredProperties = featuredProperties;
			return next();
		})
		.catch(next);
	});

	const viewName = 'index';
	// Render the view
	view.render(viewName);
};
