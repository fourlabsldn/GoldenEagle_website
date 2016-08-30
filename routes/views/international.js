const keystone = require('keystone');

exports = module.exports = function international(req, res) {
	const view = new keystone.View(req, res);
	const locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'international';
	locals.data = {};

	// Load page content from database
	view.on('init', next => {
		Promise.all([
				keystone.list('International').getAll(),
				keystone.list('Property').getFeatured(),
			])
			.then(([pageContent, featuredProperties]) => {
				locals.data = pageContent[0];
				locals.featuredProperties = featuredProperties;
				return next();
			})
			.catch(next);
	});

	const viewName = 'international';
	// Render the view
	view.render(viewName);
};
