const gulp = require('gulp');
const organiser = require('gulp-organiser');
const fs = require('fs');

function replaceInFiles(replaced, replacement, fileAddrs) {
  fileAddrs.forEach(addr => {
    // Load file
    const buff = fs.readFileSync(addr);
    const content = buff.toString();

    // If already has the content, let's not do it again
    if (content.includes(replacement)) { return; }

    // Add link to our stylesheet at the end of <head>
    const newContent = content.replace(replaced, replacement);
    fs.writeFileSync(addr, newContent);
  });
}


function addCustomStylesheet() {
  const styleLink = '<link rel="stylesheet" href="/styles/site.css">';
  replaceInFiles(
    '</head>',
    `${styleLink} \n </head>`,
    ['node_modules/keystone/admin/server/templates/index.html']
  );
}


function replacePoweredByKeystone() {
  replaceInFiles(
    'KeystoneJS',
    'Four Labs',
    ['node_modules/keystone/admin/client/App/components/Footer/index.js',
      'node_modules/keystone/admin/client/Signin/Signin.js',
    ]
  );

  replaceInFiles(
    'http://keystonejs.com',
    'https://fourlabs.co.uk',
    ['node_modules/keystone/admin/client/App/components/Footer/index.js',
      'node_modules/keystone/admin/client/Signin/Signin.js',
    ]
  );
}
module.exports = organiser.register((task) => {
  gulp.task(task.name, () => {
    addCustomStylesheet();
    replacePoweredByKeystone();
  });
});
