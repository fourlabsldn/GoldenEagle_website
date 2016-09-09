import navbarHighlighter from './navbarControl/navbarHighlighter';
import navbarSubmenuController from './navbarControl/navbarSubmenu';
import navbarMobileSubmenuController from './navbarControl/navbarMobileSubmenu';
import css from './navbarControl/navbarCSS';
import { toSelector } from './utils';

function hoverHighlighting() {
  const highlight = document.querySelector(toSelector(css.highlight));
  const buttons = [].slice.call(document.querySelectorAll(toSelector(css.button)));
  const activeSelector = toSelector(css.buttonActive);

  navbarHighlighter(highlight, buttons, activeSelector);
}

export default function () {
  hoverHighlighting();
  navbarMobileSubmenuController();
  navbarSubmenuController();
}
