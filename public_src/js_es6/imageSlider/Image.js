import React from 'react';
import css from './css';

const Image = ({ url, displacement }) => (
  <div
    className={css.imageContainer}
    style={{ transform: `translateX(${displacement * 100}%)` }}
  >
    <img src={url} alt="Property" className={css.image} />
  </ div>
);

Image.propTypes = {
  url: React.PropTypes.string,
  displacement: React.PropTypes.number,
};

export default Image;
