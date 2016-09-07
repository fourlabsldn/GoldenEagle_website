const keystone = require('keystone');
const viewName = 'search';
const { curry, flow } = require('lodash/fp');
const defaultFilters = {
  pageNumber: 0,
  pageMax: 6,
};

function getProperties() {
  return keystone.list('Property').getAll();
}

const render = curry((vName, res, content) => {
  const defaultOptions = { layout: false };
  const context = { data: content };
  const options = Object.assign({}, defaultOptions, context);

  return new Promise((resolve, reject) => {
    res.render(vName, options, handleResponse(resolve, reject));
  });
});

function handleResponse(resolve, reject) {
  return (err, data) => (err ? reject(err) : resolve(data));
}


// sendJson :: ExpressResponse -> Object -> void
const sendJson = curry((res, response) => res.json(response));

// prepareResponse :: [String] -> Object
const prepareResponse = properties => ({ properties });

// ----------------------- Filters -------------------------------

const pagination = curry((filters, response) => {
  const content = response.properties;
  const beginning = filters.pageMax * filters.pageNumber;
  const end = filters.pageMax * (filters.pageNumber + 1);

  const newContent = content.slice(beginning, end);
  const pageCount = Math.ceil(content.length / filters.pageMax);
  return Object.assign({}, response, { pageCount, properties: newContent });
});

// applyFilters :: Object -> Object -> Object
const applyFilters = curry((reqFilters, response) => {
  const filters = Object.assign({}, defaultFilters, reqFilters);
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
