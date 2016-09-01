import React from 'react';
import ReactDOM from 'react-dom';
import Slider from './imageSlider/Slider';

export default function imageSlider(urls, container) {
  console.log(React, ReactDOM);
  ReactDOM.render(<Slider urls={urls} />, container);
}
