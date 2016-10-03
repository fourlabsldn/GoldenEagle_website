## Front-End JS
### How to pack a module
JS code transpilation is exporting everything as an AMD module.
Write code like this:
``` javascript
// myModule.js
export default function myModule() {
  console.log(`Hello`);
}
```

Use it in the browser as such:
``` javascript
require(['myModule'], function(myModule) {
  myModule();
})
```

## Admin UI Style
For admin UI styling to work you need to add `<link rel="stylesheet" href="/styles/site.css">` to the end of the `<head>` of `node_modules/keystone/admin/server/templates/index.html`.
