const keystone = require('keystone');
const { curry, flow, clamp, isUndefined, omitBy, isString } = require('lodash/fp');
const { overshadow, mapObj } = require('./utils');
const FuzzySet = require('fuzzyset.js');

const viewName = 'search';

// When any filter value is unspecified, this value will be used.
const defaultFilters = {
  pageNumber: 0,
  maxPerPage: 6,
  pageCount: 1,
  keywords: '',
  letType: undefined, // 'short' 'long'
  priceMin: undefined,
  priceMax: undefined,
  beds: undefined,
  baths: undefined,
  buyRent: 'rent', // 'rent', 'buy'
};

const toInt = v => {
  const parsed = parseInt(v, 10);
  if (isNaN(parsed)) {
    throw new Error(`Cannot convert '${v}' to integer.`);
  }
  return parsed;
};

const filterConversion = {
  pageNumber: toInt,
  maxPerPage: toInt,
  pageCount: toInt,
  keywords: String,
  letType: String, // 'short' 'long'
  priceMin: toInt,
  priceMax: toInt,
  beds: toInt,
  baths: toInt,
  buyRent: String,
};

// convert :: Object ->
const convert = curry((conversions, target) => {
  const f = (key, value) => {
    try {
      return conversions[key](value);
    } catch (e) {
      throw new Error(`Error parsing ${key}: ${e.message}`);
    }
  };
  return mapObj(f, target);
});

function parseFilters(filters) {
  return flow(
    overshadow(defaultFilters),
    omitBy(isUndefined), // Omit all undefined values
    convert(filterConversion)
  )(filters);
}

function getProperties() {
  return keystone.list('Property').getAll();
}

function handleResponse(resolve, reject) {
  return (err, data) => (err ? reject(err) : resolve(data));
}

const render = curry((vName, res, content) => {
  // TODO: use filter value for buyRent here
  const defaultOptions = { layout: false, buyRent: 'rent' };
  const context = { data: content };
  const options = Object.assign({}, defaultOptions, context);

  return new Promise((resolve, reject) => {
    res.render(vName, options, handleResponse(resolve, reject));
  });
});

// sendJson :: ExpressResponse -> Object -> void
const sendJson = curry((res, response) => res.json(response));

// prepareResponse :: [String] -> Object
const prepareResponse = properties => ({ properties });

// ----------------------- Filters -------------------------------
/**
 * Filter by exact number of bedrooms
 * filterBeds
 * @param {Object} filters
 * @param {Object} response
 */
const filterBeds = curry((filters, response) => {
  const beds = filters.beds; // may be undefined
  // We use this negation because if prop.beds is undefined the outcome
  // will be false in any comparison and we want it to be included.
  // properties with `beds` or more bedrooms
  const properties = isUndefined(beds)
    ? response.properties
    : response.properties.filter(prop => !(prop.bedrooms !== beds));
  return Object.assign({}, response, { beds, properties });
});

/**
 * Filter by minimum number of bathrooms
 * filterBaths
 * @param {Object} filters
 * @param {Object} response
 */
const filterBaths = curry((filters, response) => {
  const baths = filters.baths; // may be undefined
  const properties = isUndefined(baths)
    ? response.properties
    : response.properties.filter(prop => !(prop.bathrooms < baths));
  return Object.assign({}, response, { baths, properties });
});

/**
 * filterPrice
 * @param {Object} filters
 * @param {Object} response
 */
const filterPrice = curry((filters, response) => {
  const buyRent = filters.buyRent; // never undefined
  const priceMin = filters.priceMin; // may be undefined
  const priceMax = filters.priceMax; // may be undefined
  const properties = response.properties.filter(prop => {
    const aboveMin = !(prop[buyRent].price < priceMin);
    const belowMax = !(prop[buyRent].price > priceMax);
    return aboveMin && belowMax;
  });
  return Object.assign({}, response, { priceMin, priceMax, properties });
});

/**
 * Filter by minimum number of bathrooms
 * filterKeywords
 * @param {Object} filters
 * @param {Object} response
 */
const filterKeywords = curry((filters, response) => {
  const keywords = filters.keywords || undefined; // may be empty array;
  const properties = isUndefined(keywords)
    ? response.properties
    : response.properties.filter(prop => {
      const whatToMatch = [
        prop.location.postcode,
        prop.location.state,
        prop.location.suburb,
        prop.location.street1,
        prop.location.country,
        prop.locationDescription,
        prop.ownership,
        prop.summary,
        prop.type,
      ].filter(isString);
      const matcher = FuzzySet(whatToMatch); // eslint-disable-line new-cap
      const results = matcher.get(keywords) || [];
      // Results are in arrays with accuracy and the string, we want
      // to remove any item with accuracy smaller than 0.5
      const filtered = results.filter(r => r[0] > 0.3);
      return filtered.length > 0;
    });
  return Object.assign({}, response, { keywords, properties });
});
/**
 * filterPagination
 * @param {Object} filters
 * @param {Object} response
 */
const filterPagination = curry((filters, response) => {
  const content = response.properties;
  // Make sure we will never divide by 0
  const maxPerPage = Math.max(1, filters.maxPerPage);

  const pageCount = Math.ceil(content.length / maxPerPage);
  // pageNumber between 0 and pageCount -1.
  // pageCount - 1 because pageNumber starts from 0 and pageCount starts from 1
  const pageNumber = clamp(0, pageCount - 1, filters.pageNumber);

  // >= 0
  const beginning = Math.max(0, maxPerPage * pageNumber);
  // >= `beginning`
  const end = Math.max(beginning, maxPerPage * (pageNumber + 1));

  const newContent = content.slice(beginning, end);

  return Object.assign({}, response, {
    pageNumber,
    pageCount,
    maxPerPage,
    properties: newContent,
  });
});

// applyFilters :: Object -> Object -> Object
const applyFilters = curry((reqFilters, response) => {
  const filters = parseFilters(reqFilters);
  return flow(
    filterBaths(filters),
    filterBeds(filters),
    filterPrice(filters),
    filterKeywords(filters),
    filterPagination(filters)
  )(response);
});

// ----------------------- end of filters -----------------------

const insertIntoTemplate = curry((renderFunc, response) => {
  // Apply render function
  const templatePromises = response.properties.map(renderFunc);
  return Promise.all(templatePromises)
    .then(templates => {
      // Replace objects for templatez
      return Object.assign({}, response, { properties: templates });
    });
});

exports = module.exports = function search(req, res) {
  const filters = req.query;
  const renderPropertyCard = render(viewName, res);

  getProperties()
  .then(prepareResponse)
  .then(applyFilters(filters))
  .then(insertIntoTemplate(renderPropertyCard))
  .then(sendJson(res))
  .catch((err) => {
    console.log(err);
    res.status(400).send({ err: err.message });
  });
};
