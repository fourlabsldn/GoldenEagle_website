const keystone = require('keystone');

exports = module.exports = function (req, res) {
	const view = new keystone.View(req, res);
	const locals = res.locals;

  // locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'Home';
	locals.data = {};

	// Load page content from database
  view.on('init', next => loadHomeContent(next, locals));

  const viewName = 'index';
	// Render the view
  locals.section = viewName;
	view.render(viewName);
};

function loadHomeContent(next, locals) {
  // Add loaded content to 'locals' to make it accessible to the view
  keystone.list('Home').getAll()
  .then((homeContent) => {
    if (Array.isArray(homeContent)) {
      locals.data = homeContent[0];
    }

    return next();
  })
  .catch(next);
}
