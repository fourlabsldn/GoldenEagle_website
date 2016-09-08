import React from 'react';
import FiltersBar from './FiltersBar';
import { interruptibleRequest, overshadow } from '../utils';
import { curry } from 'lodash/fp';

const searchEndpoint = '/search';

// Prepares input for dangerouslySetInnerHTML
// sanitise :: String -> Object
const sanitise = html => ({ __html: html });

const request = interruptibleRequest();

const loadJson = (...args) => request(...args).then(r => r.json());

/**
 * processServerResponse
 * @param {Object} state - Current application state
 * @param {Object} response
 * @return {Object} new application state
 */
const processServerResponse = curry((state, response) => {
  // Extract the parameters we need
  const pagination = overshadow(state.pagination, response);
  const search = overshadow(state.search, response);
  const properties = response.properties;

  // Create a new state with our new values
  return overshadow(state, { pagination, search, properties });
});

const sequenceArray = (beginning, end) => {
  // Plus one because we include both ends.
  const span = Math.max(0, end + 1 - beginning);
  return [...Array(span).keys()].map(v => v + beginning);
};

export default class SearchModule extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      properties: [], // Array of objects
      // Pagination info to be sent with requests
      pagination: {
        pageNumber: 0,
        maxPerPage: 6,
        pageCount: 1,
      },
      // Search info to be sent with requests
      search: {
        keywords: '',
        letType: 'short', // 'short' 'long'
        priceMin: undefined,
        priceMax: undefined,
        beds: undefined,
        baths: undefined,
      },
    };

    this.mergeSearchParams = this.mergeSearchParams.bind(this);
    this.goToPage = this.goToPage.bind(this);
    this.loadProperties = this.loadProperties.bind(this);
    this.goToPage(0);
  }

  mergeSearchParams(params) {
    console.log('Setting search to', params);
    const searchParams = overshadow(this.state.search, params);
    this.loadProperties(searchParams);
  }

  goToPage(pageNumber) {
    // Create a new pagination object with the next page as pageNumber
    const pagination = overshadow(this.state.pagination, { pageNumber });
    const search = this.state.search;

    // Merge pagination and search variables to use all of these
    // as search parameters for the server
    const searchParams = Object.assign({}, search, pagination);
    this.loadProperties(searchParams);
  }

  loadProperties(searchParams) {
    loadJson(searchEndpoint, searchParams)
      .then(processServerResponse(this.state))
      .then(s => this.setState(s))
      .catch(console.log);
  }

  render() {
    console.log(this.state);
    const currPage = this.state.pagination.pageNumber;
    const nextPage = () => this.goToPage(currPage + 1);
    const prevPage = () => this.goToPage(currPage - 1);

    // Pages array with current page in bold
    // p - 1 because current page starts from 0
    const pages = sequenceArray(1, this.state.pagination.pageCount)
                    .map(p => (p - 1 === currPage ? <b>{p}</b> : p));
    return (
      <div>
        <FiltersBar
          {...this.state.search}
          mergeSearchParams={this.mergeSearchParams}
        />

        <div className="row">
          {this.state.properties.map(property => (
            <div className="col-md-4 col-sm-6" dangerouslySetInnerHTML={sanitise(property)} />
          ))}
        </ div>

        <p>Page {pages}</p>
        <button onClick={prevPage}> Prev </button>
        <button onClick={nextPage}> Next </button>
      </ div>
    );
  }
}
