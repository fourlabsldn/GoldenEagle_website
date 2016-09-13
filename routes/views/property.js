const keystone = require('keystone');

/**
 * [description]
 * @method
 * @param  {Object} req [description]
 * @param  {Object} res [description]
 * @param  {String} acquisitionMode - 'rent' or 'buy'
 * @return {void}
 */
exports = module.exports = (req, res, acquisitionMode) => {
  const view = new keystone.View(req, res);
  const locals = res.locals;

  // locals.section is used to set the currently selected
  // item in the header navigation.
  locals.section = 'property';
  locals.acquisitionMode = acquisitionMode;
  locals.filters = {
    slug: req.params.slug
  };

  // Load correct property
  view.on('init', (next) => {
    keystone.list('Property').findWhere({
    	slug: locals.filters.slug
    })
    .then(result => {
    	if (result && result[0]) {
        const property = result[0];
        locals.data = property;
        locals.title = property.location.street1;
      	next();
      } else {
      	res.render('404');
      }
    })
    .catch(e => console.log);
  });

	// Render the view
  const viewName = 'property';
  view.render(viewName);
};
