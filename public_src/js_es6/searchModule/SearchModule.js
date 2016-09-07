import React from 'react';
import FiltersBar from './FiltersBar';
import { request } from '../utils';
import { map, get, curry } from 'lodash/fp';

const searchEndpoint = '/search';

// Prepares input for dangerouslySetInnerHTML
// sanitise :: String -> Object
const sanitise = html => ({ __html: html });

// Creates a new object with properties of the old one
// overshadowed by properties of the new object.
// No new properties of the new Object are added.
// overshadow Object -> Object -> Object
const overshadow = (oldObj, newObj)=> {
  return Object.keys(oldObj)
    .reduce((result, key) => {
      result[key] = newObj[key] || oldObj[key]; // eslint-disable-line no-param-reassign
      return result;
    }, {});
};

export default class SearchModule extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      propertiesHTML: [], // Array of objects
      lastLoadTime: new Date(),
      // Pagination info to be sent with requests
      paginationParams: {
        pageNumber: 0,
        pageMax: 3,
        pageCount: 1,
      },
      // Search info to be sent with requests
      searchParams: {},
    };

    this.loadProperties(this.state.searchParams);

    this.setLastLoadTime = this.setLastLoadTime.bind(this);
    this.setPropertiesHTML = this.setPropertiesHTML.bind(this);
    this.setSearchParams = this.setSearchParams.bind(this);
    this.setPaginationParams = this.setPaginationParams.bind(this);
    this.loadProperties = this.loadProperties.bind(this);
    this.processResponse = this.processResponse.bind(this);
    this.nextPage = this.nextPage.bind(this);
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
    const searchParams = overshadow(this.state.searchParams, params);
    this.setState({ searchParams });
  }

  /**
   * setSearchParams
   * @param {Object} params
   */
  setPaginationParams(params) {
    console.log(params);
    const paginationParams = overshadow(this.state.paginationParams, params);
    this.setState({ paginationParams });
  }

  /**
   * loadProperties
   * @param {Object} params
   */
  loadProperties(searchParams) {
    // anotherLoadEventHappened :: Date -> Boolean
    const anotherLoadEventHappened = loadTime => !!this.state.lastLoadTime > loadTime;
    // Create an object with all variables needed for our search
    const requestParams = Object.assign({}, this.state.paginationParams, searchParams);
    // We will use loadTime to see if we should process our response when
    // it arrives or whether another request was made.
    const loadTime = new Date();
    this.setLastLoadTime(loadTime);
    request(searchEndpoint, requestParams)
      .then(r => r.json())
      .then(r => (anotherLoadEventHappened(loadTime) ? null : this.processResponse(r)));
  }

  processResponse(response) {
    // insert properties into DOM
    const propertiesHTML = response.properties;
    this.setPropertiesHTML(propertiesHTML.map(sanitise));
    // Update pagination parameters
    this.setPaginationParams(response);
  }

  nextPage() {
    const pagination = this.state.paginationParams;
    this.setPaginationParams({
      pageNumber: Math.min(pagination.pageNumber + 1, pagination.pageCount),
    });
    this.loadProperties(this.state.searchParams);
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

        <p>Page <b>{this.state.paginationParams.pageNumber + 1}</b></p>
        <button onClick={this.nextPage} value=">" />
      </ div>
    );
  }
}
