import { toSelector } from '../utils';
import CSS from './navbarCSS';

export default function navbarMobileSubmenu() {
  const submenuWrappersHTMLCol = document.querySelectorAll(toSelector(CSS.mobile.hasSubmenu));
  const submenuWrappers = Array.from(submenuWrappersHTMLCol);
  const toggleBtn = document.querySelector(toSelector(CSS.mobile.toggleBtn));

  toggleBtn.addEventListener('click', () => {
    toggleBtn.classList.toggle(CSS.mobile.toggleBtnActive);
    document.querySelector('#header').classList.toggle('gew_navbar--mobileMenu-visible');
  });

  submenuWrappers.forEach(w => {
    w.addEventListener('click', () => {
      w.classList.toggle(CSS.mobile.hasSubmenuVisible);
    });
  });
}
