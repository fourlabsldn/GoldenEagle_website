import React from 'react';
import FiltersBar from './FiltersBar';
import { request } from '../utils';

const searchEndpoint = '/search';
export default class SearchModule extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      propertiesHTML: '', // String
      lastLoadTime: new Date(),
      searchParams: {},
    };

    this.loadProperties(this.state.searchParams);
  }

  /**
   * setLastLoadTime
   * @param {Date} time
   */
  setLastLoadTime(time) {
    this.setState({ lastLoadTime: time });
  }

  /**
   * setPropertiesHTML
   * @param {String} html
   */
  setPropertiesHTML(html) {
    this.setState({ propertiesHTML: html });
  }

  /**
   * setSearchParams
   * @param {Object} params
   */
  setSearchParams(params) {
    this.setState({ searchParams: params });
  }

  /**
   * loadProperties
   * @param {Object} params
   */
  loadProperties(params) {
    const loadTime = new Date();
    this.setLastLoadTime(loadTime);

    const processHTML = html => {
      const anotherLoadEventHappened = this.state.lastLoadTime > loadTime;
      if (!anotherLoadEventHappened) {
        this.setPropertiesHTML(html);
      }
    };

    request(searchEndpoint, params)
      .then(r => r.text())
      .then(processHTML);
  }

  render() {
    return (
      <div>
        <FiltersBar
          search="Testd"
          letTime={0}
          priceRange={0}
          bedrooms={0}
          baths={0}
          moreFilters={0}
          currency={0}
        />
        Imagine some more content

        <div dangerouslySetInnerHTML={{__html: this.state.propertiesHTML}} />
      </ div>
    );
  }
}
