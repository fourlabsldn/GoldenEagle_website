import React from 'react';
import ReactDOM from 'react-dom';
import SearchModule from './searchModule/SearchModule';
import assert from 'fl-assert';

/**
 * @param {String} selector - CSS selector
 * @param {String} category - 'sales' or 'rent'
 */
export default function searchModule(selector, category) {
  const container = document.querySelector(selector);
  assert(!!container, `No container element found using selector ${selector}`);
  console.log(container);
  ReactDOM.render(<SearchModule category={category} />, container);
}
