import React from 'react';
import FiltersBar from './FiltersBar';
import PropertyCard from './PropertyCard';
import propertyExample from './propertyExample';

export default class SearchModule extends React.Component {
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
        <PropertyCard info={propertyExample} />
      </ div>
    );
  }
}
