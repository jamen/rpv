# RPV
Express CSS in JavaScript through Rule, Property, and Value objects.

## Installation
```
npm install rpv --save
```

Or add it a dependency directly

```javascript
{
  // ...
  "dependencies": {
    "rpv": "latest"
  }
}
```

## Usage
RPV comes wrapped with the `Rule`, `Property`, and `Value` objects, but also some management functions and objects to build and manage trees and custom components...  Such as `create`, `search`, `render`, and `Tree`.  We can get the whole suite with destructuring like so:

```javascript
const rpv = require('rpv'),
      { Tree, Rule, Property, Value } = rpv;
```

From here the possibilities are endless.  Read more in the [RPV Wiki](https://github.com/jamen/rpv/wiki) for documentation and how to get started.
