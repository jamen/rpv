# BPV
Express CSS in JavaScript through Block, Property, and Value objects.

## Installation
```
npm install bpv --save
```

Or add it a dependency directly

```javascript
{
  // ...
  "dependencies": {
    "bpv": "latest"
  }
}
```

## Usage
Require necessary components:
```javascript
const spv = require('spv'), {Block, Property, Value} = spv;
```

Create a tree:
```javascript
let tree = [
  Block('foo', [
    Property('bar', Value(5, 'px'));
  ])
];
```

Learn more in the [BPV Wiki](https://github.com/jamen/bpv/wiki)
