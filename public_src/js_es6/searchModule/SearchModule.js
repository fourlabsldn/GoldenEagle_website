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

export default class SearchModule extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      properties: [], // Array of objects
      // Pagination info to be sent with requests
      pagination: {
        pageNumber: 0,
        pageMax: 3,
        pageCount: 1,
      },
      // Search info to be sent with requests
      search: {},
    };

    this.goToPage(0);
    this.goToPage = this.goToPage.bind(this);
  }

  goToPage(pageNumber) {
    // Create a new pagination object with the next page as pageNumber
    const pagination = overshadow(this.state.pagination, { pageNumber });
    const search = this.state.search;

    // Merge pagination and search variables to use all of these
    // as search parameters for the server
    const searchParams = Object.assign({}, search, pagination);
    loadJson(searchEndpoint, searchParams)
      .then(processServerResponse(this.state))
      .then(s => this.setState(s))
      .catch(() => console.log);
  }

  render() {
    const currPage = this.state.pagination.pageNumber;
    const nextPage = () => this.goToPage(currPage + 1);
    const prevPage = () => this.goToPage(currPage - 1);
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
          {this.state.properties.map(property => (
            <div className="col-md-4 col-sm-6" dangerouslySetInnerHTML={sanitise(property)} />
          ))}
        </ div>

        <p>Page <b>{this.state.pagination.pageNumber + 1}</b></p>
        <button onClick={prevPage}> Prev </button>
        <button onClick={nextPage}> Next </button>
      </ div>
    );
  }
}
