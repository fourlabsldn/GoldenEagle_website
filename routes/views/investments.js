const keystone = require('keystone');

exports = module.exports = function investments(req, res) {
	const view = new keystone.View(req, res);
	const locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'investments';
	locals.data = {};

	// Load page content from database
	view.on('init', next => {
		Promise.all([
				keystone.list('Investments').getAll(),
				keystone.list('CaseStudy').getAll()
			])
			.then(([pageContent, caseStudies]) => {
				locals.data = pageContent[0];
				locals.caseStudies = caseStudies;
				return next();
			})
			.catch(next);
	});

	const viewName = 'investments';
	// Render the view
	view.render(viewName);
};
