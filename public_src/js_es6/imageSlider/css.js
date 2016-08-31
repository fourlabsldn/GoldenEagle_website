const PREFIX = 'gew_imageSlider';

const bem = (...args) => [PREFIX].concat(args).join('-');

export default {
  main: bem(),
  btnNext: bem('btn', 'next'),
  btnPrev: bem('btn', 'prev'),
  image: bem('image'),
  imageContainer: bem('imageContainer'),
  proportionKeeper: bem('proportionKeeper'),
};
