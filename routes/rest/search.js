const keystone = require('keystone');
const handlebars = require('handlebars');

exports = module.exports = function search(req, res) {
  const view = new keystone.View(req, res);
  const locals = res.locals;

  // locals.section is used to set the currently selected
  // item in the header navigation.
  locals.section = 'search';
  locals.data = {};

  // Load page content from database
  view.on('init', next => {
  	keystone.list('Property').getAll()
  		.then((properties) => {
  			locals.properties = properties;
  			return next();
  		})
  		.catch(next);
  });

  const viewName = 'search';

	// Render the view
  view.render(viewName, {
    layout: false,
  });
};
