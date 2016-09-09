const keystone = require('keystone');

exports = module.exports = function lettings(req, res) {
	const view = new keystone.View(req, res);
	const locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'lettings';
	locals.data = {};

	const viewName = 'lettings';
	// Render the view
	view.render(viewName);
};
