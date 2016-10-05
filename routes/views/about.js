const keystone = require('keystone');

const staff = [
  { photo: 'staff-2_v2fbvs.jpg', name: 'John Smith', tel: '+44 (0)20 1234 5678' },
  { photo: 'staff-1_buu1u4.jpg', name: 'John Smith', tel: '+44 (0)20 1234 5678' },
  { photo: 'staff-3_uexyxr.jpg', name: 'John Smith', tel: '+44 (0)20 1234 5678' },
  { photo: 'staff-4_gajdol.jpg', name: 'John Smith', tel: '+44 (0)20 1234 5678' },
];

exports = module.exports = function about(req, res) {
	const view = new keystone.View(req, res);
	const locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'about';
	locals.data = {};

	// Load page content from database
	view.on('init', next => {

    Promise.all([
      keystone.list('About').getAll(),
      keystone.list('Staff').getAll(),
    ])
		.then(([pageContent, staff]) => {
			locals.data = pageContent[0];
      locals.staff = staff;
			return next();
		})
		.catch(next);
	});

	const viewName = 'about';
	// Render the view
	view.render(viewName);
};
