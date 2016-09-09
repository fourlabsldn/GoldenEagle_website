import CSS from './navbarCSS';
import { toSelector } from '../utils';
import { curry } from 'lodash/fp';

const noClass = curry((c, el) => !el.classList.contains(c));
const hasClass = curry((c, el) => el.classList.contains(c));

// calls a function with a delay and cancels it if there is another
// call before the completion of the first one.
// It's like throttling with custom delays.
const cancellable = (function () {
  let timeout;
  return (func, delay) => {
    clearTimeout(timeout);
    timeout = setTimeout(func, delay);
  };
}());

// Handles showing and hiding the submenu
export default function navbarSubmenu() {
  const header = document.querySelector(CSS.globalWrapper);

  const buttons = document.querySelectorAll(toSelector(CSS.button));
  const submenuBtn = Array.from(buttons)
  .find(hasClass(CSS.buttonHasSubmenu));
  const noSubmenuButtons = Array.from(buttons)
    .filter(noClass(toSelector(CSS.buttonHasSubmenu)));
  const backgroundOverlay = document.querySelector(toSelector(CSS.overlay));

  const hideSubmenu = () => cancellable(
    () => header.classList.remove(CSS.showSubmenu),
    15
  );

  const showSubmenu = () => cancellable(
    () => header.classList.add(CSS.showSubmenu),
    500
  );

  const toggleSubmenu = () => cancellable(
    () => header.classList.toggle(CSS.showSubmenu),
    15
  );

  [...noSubmenuButtons, backgroundOverlay].forEach(
    btn => btn.addEventListener('mouseover', hideSubmenu)
  );
  submenuBtn.addEventListener('mouseover', showSubmenu);
  submenuBtn.addEventListener('click', toggleSubmenu);
  // Cancel any timeout when leaving head
  header.addEventListener('mouseout', () => cancellable(() => null, 0));
}
