const keystone = require('keystone');

exports = module.exports = function contact(req, res) {
	const view = new keystone.View(req, res);
	const locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'contact';
	locals.data = {};

	// Load page content from database
	view.on('init', next => {
		keystone.list('Contact').getAll()
		.then((pageContent) => {
			locals.data = pageContent[0];
			return next();
		})
		.catch(next);
	});

	const viewName = 'contact';
	// Render the view
	view.render(viewName);
};
