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
    const insertIntoDOM = curry((loadTime, properties) => {
      const anotherLoadEventHappened = this.state.lastLoadTime > loadTime;
      console.log('anotherLoadEventHappened', anotherLoadEventHappened);
      if (!anotherLoadEventHappened) {
        this.setPropertiesHTML(properties);
      }
    });

    const loadTime = new Date();
    this.setLastLoadTime(loadTime);
    request(searchEndpoint, params)
      .then(r => r.json())
      .then(get('properties'))
      .then(map(sanitise))
      .then(insertIntoDOM(loadTime));
  }

  render() {
    console.log(this.state);
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
