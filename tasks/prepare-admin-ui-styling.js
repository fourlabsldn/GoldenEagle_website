const gulp = require('gulp');
const organiser = require('gulp-organiser');
const fs = require('fs');

module.exports = organiser.register((task) => {
  gulp.task(task.name, () => {
    // Load UI template fileu
    const buff = fs.readFileSync('node_modules/keystone/admin/server/templates/index.html');
    const content = buff.toString();

    const styleLink = '<link rel="stylesheet" href="/styles/site.css">';

    // If already links to our stylesheet we have nothing else to do
    if (content.includes(styleLink)) {
      return;
    }

    // Add link to our stylesheet at the end of <head>
    const newContent = content.replace('</head>', `${styleLink} \n </head>`);
    fs.writeFileSync('node_modules/keystone/admin/server/templates/index.html', newContent);
  });
});
