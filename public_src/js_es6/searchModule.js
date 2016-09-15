import React from 'react';
import ReactDOM from 'react-dom';
import SearchModule from './searchModule/SearchModule';
import assert from 'fl-assert';
import { getUrlParameters } from './utils';
/**
 * @param {String} selector - CSS selector
 * @param {String} category - 'sales' or 'rent'
 */
export default function searchModule(selector, category) {
  const container = document.querySelector(selector);
  assert(!!container, `No container element found using selector ${selector}`);

  const initialSearch = getUrlParameters();
  ReactDOM.render(<SearchModule category={category} initialSearch={initialSearch} />, container);
}
