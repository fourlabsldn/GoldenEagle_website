/**
 * This file contains the common middleware used by your routes.
 *
 * Extend or replace these functions as your application requires.
 *
 * This structure is not enforced, and just a starting point. If
 * you have more middleware you may want to group it as separate
 * modules in your project's /lib directory.
 */
var _ = require('lodash');


/**
	Initialises the standard view locals

	The included layout depends on the navLinks array to generate
	the navigation in the header, you may wish to change this array
	or replace it with your own templates / logic.
*/
exports.initLocals = function (req, res, next) {
	res.locals.navLinks = [
		{ label: 'About', key: 'about', href: '/about' },
    { label: 'Properties', key: 'properties', href: '#',
      submenu: [
        { label: 'Sales', href: '/sales', background: 'navbar-2_nigkjw.jpg' },
        { label: 'Lettings', href: '/lettings', background: 'navbar-1_tzsnp6.jpg' },
        { label: 'Commercial', href: '/commercial', background: 'navbar-4_cikuiu.jpg' },
        { label: 'International', href: '/international', background: 'international_ialngf.jpg' },
      ]
    },
    { label: 'Developments', key: 'developments', href: '/developments' },
		{ label: 'Investments', key: 'investments', href: '/investments' },
    { label: 'Management', key: 'management', href: '/management' },
		{ label: 'Contact', key: 'contact', href: '/contact' },
    // { label: 'Blog', key: 'blog', href: '/blog' },
    // { label: 'Gallery', key: 'gallery', href: '/gallery' },
	];

  res.locals.googleMapsKey = process.env.GOOGLE_BROWSER_KEY;
	res.locals.user = req.user;
	next();
};


/**
	Fetches and clears the flashMessages before a view is rendered
*/
exports.flashMessages = function (req, res, next) {
	var flashMessages = {
		info: req.flash('info'),
		success: req.flash('success'),
		warning: req.flash('warning'),
		error: req.flash('error'),
	};
	res.locals.messages = _.some(flashMessages, function (msgs) { return msgs.length; }) ? flashMessages : false;
	next();
};


/**
	Prevents people from accessing protected pages when they're not signed in
 */
exports.requireUser = function (req, res, next) {
	if (!req.user) {
		req.flash('error', 'Please sign in to access this page.');
		res.redirect('/keystone/signin');
	} else {
		next();
	}
};
