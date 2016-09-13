import React from 'react';
import css from './css';

const Image = ({ fields, displacement }) => (
  <div
    className={css.image}
    style={{
      overflow: 'hidden',
      position: 'relative',
      transform: `translateX(${displacement * -100}%)`,
    }}
  >
    <img
      className={css.backgroundCover}
      srcSet={fields.srcset}
      sizes={fields.sizes}
      src={fields.src}
      alt={fields.alt}
      style={{ maxWidth: '100%' }}
    />
  </div>
);

Image.propTypes = {
  fields: React.PropTypes.object,
  displacement: React.PropTypes.number,
};

export default Image;
