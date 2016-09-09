const keystone = require('keystone');

exports = module.exports = function (req, res) {
	const view = new keystone.View(req, res);
	const locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'sales';
	locals.data = {};

	// Load page content from database
	view.on('init', next => {
		// Add loaded content to 'locals' to make it accessible to the view
		keystone.list('Property').getForRent()
		.then((pageContent) => {
      locals.data = pageContent;
			return next();
		})
		.catch(next);
	});

	const viewName = 'sales';
	// Render the view
	view.render(viewName);
};
