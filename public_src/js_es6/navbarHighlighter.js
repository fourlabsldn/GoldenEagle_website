
const scheduler = (delay) => {
  let timeout;
  return (task, now = false) => {
    clearTimeout(timeout);
    timeout = setTimeout(task, now ? 0 : delay);
  };
};

const getPosition = (el) => {
  return el.getBoundingClientRect().left;
};

const elementLeftDistance = (el1, el2) => {
  return getPosition(el2) - getPosition(el1);
};

// Impure
const setTranslationX = (el, translation) => {
  el.dataset.x = translation; // eslint-disable-line no-param-reassign
  el.style.transform = `translateX(${translation}px)`; // eslint-disable-line no-param-reassign
};

// Impure
const setWidth = (el, width) => {
  el.style.width = `${width}px`; // eslint-disable-line no-param-reassign
};

// Impure because of setTranslationX
const translateToElement = (translatedEl, referenceEl) => {
  // Because the highlighter is being
  // moved around, let's calculate the distance between it's
  // parent elemen and the referenceEl.
  const parent = translatedEl.parentElement;
  const distance = elementLeftDistance(parent, referenceEl);
  setTranslationX(translatedEl, distance);
};

const setHighlightedEl = (highlight, el) => {
  translateToElement(highlight, el);
  setWidth(highlight, el.clientWidth);
};

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
  const now = true;
  const schedule = scheduler(200); // ms
  const translateHighlightTo = (el, immediate) => {
    schedule(() => setHighlightedEl(highlight, el), immediate);
  };

  translateHighlightTo(activeElement, now);
  buttons.forEach(btn => {
    btn.addEventListener('mouseover', () => translateHighlightTo(btn, now));
    btn.addEventListener('mouseout', () => translateHighlightTo(activeElement));
  });
}
