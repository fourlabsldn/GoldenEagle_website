import React from 'react';
import css from './css';

const Image = ({ url, displacement }) => (
  <div
    className={css.image}
    style={{
      transform: `translateX(${displacement * -100}%)`,
      backgroundImage: `url(${url})`,
    }}
  />
);

Image.propTypes = {
  url: React.PropTypes.string,
  displacement: React.PropTypes.number,
};

export default Image;
