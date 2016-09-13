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

  // Load correct property
  view.on('init', (next) => {
    keystone.list('Property').findWhere({ slug: req.params.slug })
    .then(result => {
      if (!(result && result[0])) { return res.render('404'); }
      const property = result[0];
      locals.data = property;
      locals.title = property.location.street1;
      return keystone.list('Property').getRelated(property, acquisitionMode);
    })
    .then(related => {
      locals.data.related = related || [];
      next();
    })
    .catch(console.log);
  });

	// Render the view
  const viewName = 'property';
  view.render(viewName);
};
