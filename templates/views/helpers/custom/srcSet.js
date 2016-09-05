const cloudinary = require('cloudinary');
const path = require('path');
const defaultOptions = {
	crop: 'lfill',
	gravity: 'center',
	flags: 'progressive',
  secure: true,
};

const defaultWidths = [1500, 1240, 1020, 820, 620, 310];

/**
 * @param  {String} imgName - Either the image url or the image name
 * @param  {Array} args - Contain the widths and the Handlebars options object.
 * @return {String}
 */
module.exports = function srcSet(imgUrl, ...args) {
	// The last argument of args is the handlebars options object. Let's remove it.
	const imgWidths = args.slice(0, args.length - 1);
	const widths = imgWidths.length > 0 ? imgWidths : defaultWidths;
	const imgName = path.parse(String(imgUrl)).base; // Looks like this: 'myImg.jpg'

	const urlSet = widths
		.map(w => Object.assign({}, defaultOptions, { width: w })) // create options obj
		.map(options => cloudinary.url(imgName, options)) // create url
		// add width annotation
		.map((url, idx, arr) => {
			return arr.length === 1 ? url : `${url} ${widths[idx]}w`;
		})
		.join(',\n');

	return urlSet;
};
