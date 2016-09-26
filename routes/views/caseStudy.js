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
  locals.section = 'case study';
  locals.acquisitionMode = acquisitionMode;

  // Load correct caseStudy
  view.on('init', (next) => {
    keystone.list('CaseStudy').findWhere({ slug: req.params.slug })
    .then(result => {
      if (!(result && result[0])) {
        return res.render('404');
      }
      const caseStudy = result[0];
      locals.data = caseStudy;
      return next();
    })
    .catch(console.log);
  });

	// Render the view
  const viewName = 'caseStudy';
  view.render(viewName);
};
