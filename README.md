# live-tree.js [![Build Status](https://secure.travis-ci.org/mantoni/live-tree.js.png?branch=master)](http://travis-ci.org/mantoni/live-tree.js)

Fast tree with live iterator. The tree can be modified
while iterating over the nodes.

Repository: <https://github.com/mantoni/live-tree.js>

---

## Install with npm

```
npm install live-tree
```

## Browser compatibility

To use this module in a browser, download the npm package and then use
[Browserify](http://browserify.org) to create a standalone version.

## Usage

```js
var Node = require('live-tree').Node;

var n = new Node('root');
n.set('a', 2);
n.set('a.b', 3);
n.set('a.c', 7);

var c, i = n.iterator();
while ((c = i.next()) !== undefined) {
  console.log(c.value);
}
```

## Node API

- `Node(name)`: Returns a new Node with the given name. The name must be of
  type string and not empty.
- `name`: The name of the node
- `value`: The value of the node
- `children`: The list of children (see [live-list][])
- `set(name, value)`: Sets the value of the named node. If the node does not
  exist, it is created and added to the children by calling `_add(node)`. The
  value is changed by calling `_value(value)`.
- `get(name)`: Returns the value of the named node. If the node does not exist,
   undefined is returned.
- `remove(name)`: Removes the named node. If it has children, the value is
  deleted. Parent nodes in the path with no value and no remaining children
  will be removed as well.
- `node(name)`: Return the named node or undefined if the node does not exist
- `_add(node)`: Called by `set` to add a node to the children. The default
  implementation does `this.children.push(node);`.
- `_value(value)`: Called by `set` to change the value. The default
  implementation does `this.value = value;`.
- `toObject()`: Returns a plain object representation of the node and it's
  children
- `iterator()`: Returns a new `Iterator`

## Iterator API

The iterator is derived from [min-iterator][].

- `Iterator(node)`: Returns a new Iterator using the given root node
- `next()`: Returns the next node in the tree. If there are no items left,
  `undefined` is returned.

[min-iterator]: https://github.com/mantoni/min-iterator.js

## License

MIT

[live-list]: https://github.com/mantoni/live-list.js "Fast linked list with live iterator"
