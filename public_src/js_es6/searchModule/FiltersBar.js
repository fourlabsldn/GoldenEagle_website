import React from 'react';

const valueCount = 4;
const valueGap = 500000;
const valueStart = 0;
const maxPrices = [...Array(valueCount - 1).keys()] // array of values from 0 to valueCount - 1
  .map(v => (v + 1) * valueGap + valueStart); // Minimum values in pounds

const priceOption = (label, priceMin, priceMax) => ({ label, priceMin, priceMax });

const FiltersBar = props => {
  const priceOptions = maxPrices
    .map(v => priceOption(`Up to ${v}`, undefined, v));
    // .concat(priceOption(`Over ${last(maxPrices)}`, last(maxPrices), undefined));

  const set = (...args) => props.mergeSearchParams(...args);
  const change = {
    letTime: letType => set({ letType }),
    priceRange: priceMax => set({ priceMax }),
    beds: beds => set({ beds }),
    baths: baths => set({ baths }),
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        value={props.keywords}
      />

      <select value={props.letTime} onChange={e => change.letTime(e.target.value)}>
        <option disabled selected>Let time</option>
        <option value="short">Short let</option>
        <option value="long">Long let</option>
      </select>

      <select value={props.priceMax} onChange={e => change.priceRange(e.target.value)}>
        <option disabled selected>Price Range</option>
        {priceOptions.map(op => <option value={op.priceMax}>op.label</option>)}
      </select>

      <select value={props.beds} onChange={e => change.beds(e.target.value)}>
        <option disabled selected>Beds</option>
        <option value={0}>Any</option>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option value={undefined}>More than 4</option>
      </select>

      <select value={props.baths} onChange={e => change.baths(e.target.value)}>
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
};

FiltersBar.propTypes = {
  keywords: React.PropTypes.string,
  letTime: React.PropTypes.number,
  priceMin: React.PropTypes.number,
  priceMax: React.PropTypes.number,
  beds: React.PropTypes.number,
  baths: React.PropTypes.number,
  moreFilters: React.PropTypes.number,
  currency: React.PropTypes.number,
};

export default FiltersBar;
