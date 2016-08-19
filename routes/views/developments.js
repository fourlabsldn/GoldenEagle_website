const keystone = require('keystone');

exports = module.exports = function developments(req, res) {
	const view = new keystone.View(req, res);
	const locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'developments';
	locals.data = {};

	// Load page content from database
	view.on('init', next => {
		keystone.list('Developments').getAll()
			.then(contents => {
				locals.data = contents[0];
				return next();
			})
			.catch(next);
	});

	const viewName = 'developments';
	// Render the view
	view.render(viewName);
};
