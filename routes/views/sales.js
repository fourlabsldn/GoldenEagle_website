const keystone = require('keystone');

exports = module.exports = function sales(req, res) {
	const view = new keystone.View(req, res);
	const locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'sales';
	locals.data = {};

	const viewName = 'sales';
	// Render the view
	view.render(viewName);
};
