const keystone = require('keystone');

exports = module.exports = function about(req, res) {
	const view = new keystone.View(req, res);
	const locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'about';
	locals.data = {};

	// Load page content from database
	view.on('init', next => {
		keystone.list('About').getAll()
		.then((pageContent) => {
			locals.data = pageContent[0];
			return next();
		})
		.catch(next);
	});

	const viewName = 'about';
	// Render the view
	view.render(viewName);
};
