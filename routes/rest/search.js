const keystone = require('keystone');

exports = module.exports = function search(req, res) {
  const view = new keystone.View(req, res);
  const viewName = 'search';
  const toTemplate = templateCreator(res, view, viewName);

  getProperties()
    .then(props => Promise.all(props.map(toTemplate)))
    .then(templates => {
      console.dir('Sending response:', templates);
      res.json(templates);
    });
};

function getProperties() {
  return keystone.list('Property').getAll();
}

function templateCreator(res, viewName) {
  return function toTemplate(obj) {
    return new Promise(resolve => res.render(viewName, obj, resolve));
  };
}
