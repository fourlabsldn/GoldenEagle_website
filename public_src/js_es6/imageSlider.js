import React from 'react';
import ReactDOM from 'react-dom';
import Slider from './imageSlider/Slider';
import { overshadow } from './utils';

const defaultImage = { srcset: '', sizes: '', src: '', alt: '' };
const defaultOptions = {
  showThumbnails: true,
};

/**
 * @method sanitiseOptions
 * @param  {Object} options
 * @return {Object}
 */
function sanitiseOptions(options) {
  return overshadow(defaultOptions, options);
}

/**
 * @method sanitiseOneImage
 * @param  {Object} img
 * @return {Object}
 */
function sanitiseImage(img) {
  return overshadow(defaultImage, img);
}
/**
 * @function imageSlider
 * @param {Array<String>} - urls
 * @param {HTMLElement} - container
 * @param {Object} - [options]
 *
 */
export default function imageSlider(rawImages, container, userOptions = {}) {
  if (!(container && container.nodeName)) {
    throw new Error(`Invalid container provided: ${container}`);
  }

  const options = sanitiseOptions(userOptions);
  const images = rawImages.map(sanitiseImage);

  ReactDOM.render(<Slider images={images} options={options} />, container);
}
