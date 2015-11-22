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
Require necessary components:
```javascript
const rpv = require('rpv'), {Block, Property, Value} = rpv;
```

Create a tree:
```javascript
let tree = [
  Rule('foo', [
    Property('bar', Value(5, 'px'));
  ])
];
```

Learn more in the [RPV Wiki](https://github.com/jamen/bpv/wiki)
