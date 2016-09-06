import React from 'react';

const FiltersBar = props => (
  <div>
    <input
      type="text"
      placeholder="Search"
      value={props.search}
    />

    <select value={props.letTime}>
      <option>Short let</option>
      <option>Long let</option>
    </select>

    {/*  TODO: make these ranges vary according to category*/}
    <select value={props.priceRange}>
      <option disabled selected>Price Range</option>
      <option>' up to 1,000,000 '</option>
      <option>' up to 1,500,000 '</option>
      <option>' up to 2,000,000 '</option>
      <option>' up to 2,500,000 '</option>
      <option>' greater than 2,500,000 '</option>
    </select>

    <select value={props.bedrooms}>
      <option disabled selected>Beds</option>
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>More than 4</option>
    </select>

    <select value={props.baths}>
      <option disabled selected>Baths</option>
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>More than 3</option>
    </select>

    {/* TODO: Add content to 'More filters'*/}
    <select value={props.moreFilters}>
      <option disabled selected>More Filters</option>
      <option>Garage</option>
    </select>

    {/*  TODO: Allow people to choose whichever currency they want.*/}
    <select value={props.currency}>
      <option disabled selected>£</option>
      <option>British Pound</option>
      <option>Euro</option>
    </select>
  </ div>
);

FiltersBar.propTypes = {
  search: React.PropTypes.string,
  letTime: React.PropTypes.number,
  priceRange: React.PropTypes.number,
  bedrooms: React.PropTypes.number,
  baths: React.PropTypes.number,
  moreFilters: React.PropTypes.number,
  currency: React.PropTypes.number,
};

export default FiltersBar;
