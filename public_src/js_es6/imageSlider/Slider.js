/* eslint-disable react/prop-types */
import React from 'react';
import Image from './Image';
import css from './css';
import { constrain } from '../utils';


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
        .map(v => this.setState({ activeSlide: v }))
        .map(console.log);
    };
  }

  render() {
    return (
      <div className={css.main}>
        <button className={css.btnNext} onClick={this.slideMove('next')}>▶</button>
        <button className={css.btnPrev} onClick={this.slideMove('prev')}>◀</button>

        <div className={css.proportionKeeper} />

        {this.props.urls.map((url, idx) => (
          <Image url={url} displacement={idx - this.state.activeSlide} />
        ))}

      </div>
    );
  }
}

Slider.propTypes = {
  name: React.PropTypes.string,
};

export default Slider;
