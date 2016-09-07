const keystone = require('keystone');
const viewName = 'search';
const { map, curry } = require('lodash/fp');

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

const waitForPromises = p => Promise.all(p);
const sendJson = curry((res, response) => res.json(response));
const prepareResponse = properties => ({ properties });

exports = module.exports = function search(req, res) {
  console.log(req.query);

  const renderPropertyCard = render(viewName, res);
  getProperties()
  .then(map(renderPropertyCard))
  .then(waitForPromises)
  .then(prepareResponse)
  .then(sendJson(res))
  .catch((err) => res.status(500).send({ err }));
};
