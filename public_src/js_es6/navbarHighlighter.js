// import _ from 'lodash/fp';
const curry = () => {};

const centerPoint = (el) => {
  return el.offsetLeft + el.offsetWidth / 2;
};

const elementDistance = curry((el1, el2) => {
  return Math.abs(centerPoint(el1) - centerPoint(el2));
});

const getTranslationX = (el) => {
  return el.dataset.x;
};

// Impure
const setTranslationX = curry((el, translation) => {
  el.dataset.x = translation; // eslint-disable-line no-param-reassign
  el.style.transform = `translateX(${translation})`; // eslint-disable-line no-param-reassign
});

// Impure because of setTranslationX
const translateToElement = curry((translatedEl, referenceEl) => {
  const calcDistance = elementDistance(translatedEl);
  const previousTranlation = () => getTranslationX(translatedEl);
  const translateEL = setTranslationX(translatedEl);

  [referenceEl]
    .map(calcDistance)
    .map(d => d - previousTranlation())
    .map(translateEL);
});

/**
 * Moves a highlight element under a menu item
 * @method handleHighlight
 * @param  {HTMLElement} highlight - Element to be moved around
 * @param  {Array<HTMLElement>} buttons - Button elements
 * @param  {String} activeSelector - Selector for active buttton
 * @return {void}
 */
export default function handleHighlight(highlight, buttons, activeSelector) {
  const activeElement = document.querySelector(activeSelector);
  const translateHighlightTo = translateToElement(highlight);

  translateHighlightTo(activeElement);
  buttons.forEach(btn => {
    btn.addEventListener('mouseover', translateHighlightTo(btn));
  });
}
