# SPV
Express CSS in JavaScript through Selector, Property, and Value objects.

## Installation
```
npm install spv --save
```

Or add it a dependency directly

```javascript
{
  // ...
  "dependencies": {
    "spv": "latest"
  }
}
```

## Usage
Require necessary components:
```javascript
const spv = require('spv'), {Selector, Property, Value} = spv;
```

Create a tree:
```javascript
let tree = [
  Selector('foo', [
    Property('bar', Value(5, 'px'));
  ])
];
```

Learn more in the [SPV Wiki](wiki)
