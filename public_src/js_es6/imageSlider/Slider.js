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
        .map(v => constrain(v, 0, this.props.urls.length - 1))
        .map(v => this.setState({ activeSlide: v }));
    };
  }

  render() {
    const renderImages = (urls, imagesToFit, activeSlide) => {
      return urls.map(url => (
        <Image
          url={url}
          displacement={displacement(urls.length, imagesToFit, activeSlide)}
        />
      ));
    };

    return (
      <div className={css.main}>
        <button className={css.btnNext} onClick={this.slideMove('next')}>❯</button>
        <button className={css.btnPrev} onClick={this.slideMove('prev')}>❮</button>

        <div className={css.bigImages} >
          {renderImages(this.props.urls, 1, this.state.activeSlide)}
        </div>

        <div className={css.thumbnails} >
          {renderImages(this.props.urls, 3, this.state.activeSlide)}
        </div>
      </div>
    );
  }
}

Slider.propTypes = {
  name: React.PropTypes.string,
};

export default Slider;
