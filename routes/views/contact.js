const keystone = require('keystone');

function handleSubmission(next, req, res) {
  console.log('Saving stuff');
  const data = req.body;
  const Enquiry = keystone.list('Enquiry');
  const newEnquiry = new Enquiry.model({ // eslint-disable-line new-cap
    name: { full: data.name },
    email: data.email,
  });

  newEnquiry.save(err => {
    // post has been saved
    res.locals.postMessage = err || 'Thank you. We will contact you shortly.';
    next();
  });
}

exports = module.exports = function contact(req, res) {
  const view = new keystone.View(req, res);
  const locals = res.locals;

  // locals.section is used to set the currently selected
  // item in the header navigation.
  locals.section = 'contact';
  locals.data = {};

  // Load page content from database
  view.on('init', next => {
		keystone.list('Contact').getAll()
		.then((pageContent) => {
			locals.data = pageContent[0];
			return next();
		})
		.catch(next);
	});

  view.on('post', next => handleSubmission(next, req, res));

	const viewName = 'contact';
	// Render the view
	view.render(viewName);
};
