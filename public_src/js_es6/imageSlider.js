import React from 'react';
import ReactDOM from 'react-dom';
import Slider from './imageSlider/Slider';

export default function imageSlider(urls, container) {
  ReactDOM.render(<Slider urls={urls} />, container);
}
