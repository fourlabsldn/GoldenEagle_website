const keystone = require('keystone');
const { curry, flow, clamp } = require('lodash/fp');
const { overshadow } = require('./utils');

const viewName = 'search';
const defaultFilters = {
  pageNumber: 0,
  pageMax: 6,
  pageCount: 1,
};

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
// Creates new object with all property values of the parameter object
// converted to int. Throws if not possible
// valuesToInt :: Object -> Object;
const valuesToInt = obj => {
  return Object.keys(obj).reduce((result, key) => {
    const value = obj[key];
    const parsed = parseInt(value, 10);
    if (isNaN(parsed)) {
      throw new Error(`Invalid property value for ${key}: ${value}`);
    }
    result[key] = parsed; // eslint-disable-line no-param-reassign
    return result;
  }, {});
};

const pagination = curry((filters, response) => {
  const content = response.properties;

  // Make sure we will never divide by 0
  const maxPages = Math.max(1, filters.pageMax);

  const pageCount = Math.ceil(content.length / maxPages);
  // pageNumber between 0 and pageCount -1.
  // pageCount - 1 because pageNumber starts from 0 and pageCount starts from 1
  const pageNumber = clamp(0, pageCount - 1, filters.pageNumber);

  // >= 0
  const beginning = Math.max(0, maxPages * pageNumber);
  // >= `beginning`
  const end = Math.max(beginning, maxPages * (pageNumber + 1));

  const newContent = content.slice(beginning, end);

  return Object.assign({}, response, {
    pageNumber,
    pageCount,
    properties: newContent,
  });
});

// applyFilters :: Object -> Object -> Object
const applyFilters = curry((reqFilters, response) => {
  const filters = flow(
    overshadow(defaultFilters),
    valuesToInt
  )(reqFilters);

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
  .catch((err) => res.status(500).send({ err }));
};
