import React from 'react';
import FiltersBar from './FiltersBar';
import { interruptibleRequest, overshadow, encodeData } from '../utils';
import { curry } from 'lodash/fp';
import { Map, Marker } from './maps';

const searchEndpoint = '/search';
const defaults = {
  pagination: {
    pageNumber: 0,
    maxPerPage: 9,
    pageCount: 1,
  },
  // Search info to be sent with requests
  search: {
    keywords: '',
    letType: undefined, // 'short' 'long'
    priceMin: undefined,
    priceMax: undefined,
    beds: undefined,
    baths: undefined,
    moreFilters: undefined,
    buyRent: 'rent', // 'buy' 'rent'
  },
};

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
  const pagination = overshadow(defaults.pagination, response);
  const search = overshadow(defaults.search, response);
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
      pagination: defaults.pagination,
      // Search info to be sent with requests
      search: overshadow(defaults.search, this.props.initialSearch),
    };

    this.mergeSearchParams = this.mergeSearchParams.bind(this);
    this.goToPage = this.goToPage.bind(this);
    this.loadProperties = this.loadProperties.bind(this);

    this.mergeSearchParams(this.state.search);
  }

  mergeSearchParams(params) {
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

  pushHistoryState(state) {
    // URL up to the first ?
    const address = window.location.href.match(/([^\?]+)\??/)[1];
    window.history.pushState(
      {},
      'title',
      `${address}?${encodeData(state.search)}`,
    );
    return state;
  }

  loadProperties(searchParams) {
    loadJson(searchEndpoint, searchParams)
      .then(processServerResponse(this.state))
      .then(this.pushHistoryState)
      .then(s => this.setState(s))
      .catch(console.log);
  }

  render() {
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
          searchParams={this.state.search}
          mergeSearchParams={this.mergeSearchParams}
        />

        <div className="gew_sectionContent-smallPadding">

          <div
            style={{ width: '100%', height: '500px', backgroundColor: 'green' }}
          >
            <Map google={window.google} >

              <Marker
                onClick={this.onMarkerClick}
                google={window.google}
                pos={{ lat: 51.496322, lng: -0.178736 }}
                icon="http://res.cloudinary.com/golden-eagle/image/upload/v1473755159/g4172_lefldr.png"
              />
            </Map>
          </div>

          <div className="row">
            {this.state.properties.map(property => (
              <div className="col-md-4 col-sm-6" dangerouslySetInnerHTML={sanitise(property)} />
            ))}
          </ div>

          <p className="gew_search-pagination">Page
            <span className="gew_search-pagination-pages">
              {pages}
            </span>
            <button
              className="btn btn-default gew_search-pagination-button"
              onClick={prevPage}
            > Prev </button>
            <button
              className="btn btn-default gew_search-pagination-button"
              onClick={nextPage}
            > Next </button>
          </p>
        </div>
      </ div>
    );
  }
}

SearchModule.propTypes = {
  initialSearch: React.PropTypes.object,
};
