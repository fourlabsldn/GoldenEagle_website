import React from 'react';
import { curry, omit, mapValues } from 'lodash/fp';

const currency = val => `£${val}`;

// Compares two option objects by comparing all of their properties apart
// from the 'label' property.
// isSameOption :: Object -> Object
const isSameOption = curry((opt1, opt2) => {
  const keys = Object.keys(opt2).filter(k => k !== 'label');
  return keys.reduce((result, k) => result && opt1[k] === opt2[k], true);
});

const priceFunc = {
  between() { return `${currency(this.priceMin)} - ${currency(this.priceMax)}`; },
  upTo() { return `Up to ${currency(this.priceMax)}`; },
  above() { return `Above ${currency(this.priceMin)}`; },
};

const options = {
  price: [
    { priceMin: undefined, priceMax: undefined, label: () => 'Price' },
    { priceMin: undefined, priceMax: 500, label: priceFunc.upTo },
    { priceMin: 500, priceMax: 1000, label: priceFunc.between },
    { priceMin: 1000, priceMax: 1500, label: priceFunc.between },
    { priceMin: 1500, priceMax: 2000, label: priceFunc.between },
    { priceMin: 2000, priceMax: 3000, label: priceFunc.between },
    { priceMin: 3000, priceMax: undefined, label: priceFunc.above },
  ],
  baths: [
    { baths: undefined, label: 'Baths' },
    { baths: 1, label: 'More than 1' },
    { baths: 2, label: 'More than 2' },
    { baths: 3, label: 'More than 3' },
    { baths: 4, label: 'More than 4' },
  ],
  letType: [
    { letType: undefined, label: 'Let time' },
    { letType: 'short', label: 'Short' },
    { letType: 'long', label: 'Long' },
  ],
  beds: [
    { beds: undefined, label: 'Bedrooms' },
    { beds: 1, label: '1 Bedrooms' },
    { beds: 2, label: '2 Bedrooms' },
    { beds: 3, label: '3 Bedrooms' },
    { beds: 4, label: '4 Bedrooms' },
  ],
  moreFilters: [
    { moreFilters: undefined, label: 'More Filters' },
    { moreFilters: 'garage', label: 'Garage' },
    { moreFilters: 'pool', label: 'Pool' },
    { moreFilters: 'garden', label: 'Garden' },
  ],
};

const createOptions = opts => {
  return opts.map((opt, idx) => {
    const label = typeof opt.label === 'function' ? opt.label() : opt.label;
    return <option value={idx}> {label} </option>;
  });
};

const FiltersBar = props => {
  const change = (optionName, idx) => {
    const option = options[optionName][idx];
    const values = omit(['label'], option);
    props.mergeSearchParams(values);
  };

  const changeSearch = e => props.mergeSearchParams({ keywords: e.target.value });

  const searchKeyPress = e => {
    const enterKeyCode = 13;
    if (e.keyCode === enterKeyCode) { changeSearch(e); }
  };

  const selectedIndexes = mapValues(
    fieldOptions => fieldOptions.findIndex(isSameOption(props.searchParams)),
    options
  );

  return (
    <div className="gew_search-borders">
      <div className="gew_search-filtersBar gew_search-widthLimiter">
        <input
          className="gew_search-filter"
          type="text"
          placeholder="Search"
          onBlur={changeSearch}
          onKeyUp={searchKeyPress}
          defaultValue={props.searchParams.keywords}
        />

        <select
          className="gew_search-filter"
          value={selectedIndexes.letType} onChange={e => change('letType', e.target.value)}
        >
          {createOptions(options.letType)}
        </select>

        <select
          className="gew_search-filter"
          value={selectedIndexes.price} onChange={e => change('price', e.target.value)}
        >
          {createOptions(options.price)}
        </select>

        <select
          className="gew_search-filter"
          value={selectedIndexes.beds} onChange={e => change('beds', e.target.value)}
        >
          {createOptions(options.beds)}
        </select>

        <select
          className="gew_search-filter"
          value={selectedIndexes.baths} onChange={e => change('baths', e.target.value)}
        >
          {createOptions(options.baths)}
        </select>

        <select
          className="gew_search-filter"
          value={selectedIndexes.moreFilters}
          onChange={e => change('moreFilters', e.target.value)}
        >
          {createOptions(options.moreFilters)}
        </select>


        {/*  TODO: Allow people to choose whichever currency they want.*/}
        <select
          className="gew_search-filter"
          value={props.searchParams}
        >
          <option disabled selected>£</option>
          <option>Euro</option>
        </select>
      </ div>
    </ div>
  );
};

FiltersBar.propTypes = {
  searchParams: React.PropTypes.shape({
    keywords: React.PropTypes.string,
    letType: React.PropTypes.number,
    priceMin: React.PropTypes.number,
    priceMax: React.PropTypes.number,
    beds: React.PropTypes.number,
    baths: React.PropTypes.number,
    moreFilters: React.PropTypes.number,
    currency: React.PropTypes.number,
  }),
  mergeSearchParams: React.PropTypes.func,
};

export default FiltersBar;
