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
