import React from 'react';
import FiltersBar from './FiltersBar';
import { request } from '../utils';
import { map, get, curry } from 'lodash/fp';

const searchEndpoint = '/search';

// Prepares input for dangerouslySetInnerHTML
// sanitise :: String -> Object
const sanitise = html => ({ __html: html });

export default class SearchModule extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      propertiesHTML: [], // Array of objects
      lastLoadTime: new Date(),
      paginationParams: {
        pageNumber: 0,
        pageMax: 9,
      },
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
  loadProperties(searchParams) {
    const insertIntoDOM = curry((loadTime, properties) => {
      const anotherLoadEventHappened = this.state.lastLoadTime > loadTime;
      if (!anotherLoadEventHappened) {
        this.setPropertiesHTML(properties);
      }
    });

    // Create an object with all variables needed for our search
    const requestParams = Object.assign({}, this.state.paginationParams, searchParams);
    // We will use loadTime to see if we should process our response when
    // it arrives or whether another request was made.
    const loadTime = new Date();
    this.setLastLoadTime(loadTime);
    request(searchEndpoint, requestParams)
      .then(r => r.json())
      .then(get('properties'))
      .then(map(sanitise))
      .then(insertIntoDOM(loadTime));
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

        <div className="row">
          {this.state.propertiesHTML.map(property => (
            <div className="col-md-4 col-sm-6" dangerouslySetInnerHTML={property} />
          ))}
        </ div>
      </ div>
    );
  }
}
