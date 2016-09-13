/* eslint-disable react/prop-types */
import React from 'react';
import Image from './Image';
import css from './css';
import { constrain } from '../utils';


const displacement = (totalImages, imagesToFit, activeIndex) => {
  return activeIndex * (totalImages - imagesToFit) / (totalImages - 1);
};

class Slider extends React.Component {
  constructor() {
    super();
    this.state = { activeSlide: 0 };
  }

  slideMove(nextPrev) {
    return () => {
      [this.state.activeSlide]
        .map(v => { return nextPrev === 'next' ? v + 1 : v - 1; })
        .map(v => constrain(v, 0, this.props.images.length - 1))
        .map(v => this.setState({ activeSlide: v }));
    };
  }

  render() {
    const renderImages = (images, imagesToFit, activeSlide) => {
      return images.map(image => (
        <Image
          fields={image}
          displacement={displacement(images.length, imagesToFit, activeSlide)}
        />
      ));
    };

    let thumbnails = null;
    if (this.props.options.showThumbnails) {
      thumbnails = (
        <div className={css.thumbnails} >
          {renderImages(this.props.images, 3, this.state.activeSlide)}
        </div>
      );
    }

    let arrows = null;
    if (this.props.images.length > 1) {
      arrows = (
        <div style={{ width: '100%', height: '100%' }}>
          <button className={css.btnNext} onClick={this.slideMove('next')}>❯</button>
          <button className={css.btnPrev} onClick={this.slideMove('prev')}>❮</button>
        </div>
      );
    }

    return (
      <div className={css.main}>

        <div className={css.bigImages} >
          {arrows}
          {renderImages(this.props.images, 1, this.state.activeSlide)}
        </div>

        {thumbnails}

      </div>
    );
  }
}

Slider.propTypes = {
  images: React.PropTypes.object,
  name: React.PropTypes.string,
  options: React.PropTypes.object,
};

export default Slider;
