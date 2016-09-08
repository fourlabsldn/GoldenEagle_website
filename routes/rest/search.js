const keystone = require('keystone');
const { curry, flow, clamp, isUndefined, omitBy } = require('lodash/fp');
const { overshadow, mapObj } = require('./utils');

const viewName = 'search';

const defaultFilters = {
  pageNumber: 0,
  maxPerPage: 6,
  pageCount: 1,
  keywords: '',
  letType: 'short', // 'short' 'long'
  priceMin: undefined,
  priceMax: undefined,
  beds: undefined,
  baths: undefined,
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
  const defaultOptions = { layout: false };
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

const pagination = curry((filters, response) => {
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
    pagination(filters)
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
  .catch((err) => res.status(400).send({ err: err.message }));
};
