import navbarHighlighter from './navbarControl/navbarHighlighter';
import css from './navbarControl/navbarCSS';
import { toSelector } from './utils';

function hoverHighlighting() {
  const highlight = document.querySelector(toSelector(css.highlight));
  const buttons = [].slice.call(document.querySelectorAll(toSelector(css.button)));
  const activeSelector = toSelector(css.buttonActive);

  navbarHighlighter(highlight, buttons, activeSelector);
}

function setupMobileSubmenuToggle() {
  const submenuWrappers = document.querySelectorAll(toSelector(css.mobile.hasSubmenu));

  submenuWrappers.forEach(w => {
    w.addEventListener('click', () => w.classList.toggle(css.mobile.hasSubmenuVisible));
  });
}


export default function () {
  hoverHighlighting();
  setupMobileSubmenuToggle();
}
