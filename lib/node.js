/*
 * live-tree.js
 *
 * Copyright (c) 2013 Maximilian Antoni <mail@maxantoni.de>
 *
 * @license MIT
 */
'use strict';

var List     = require('live-list').List;
var Iterator = require('./iterator').Iterator;


/*
 * Returns a new Node with the given name. The name must be of type string and
 * not empty.
 */
function Node(name) {
  if (typeof name !== 'string') {
    throw new TypeError('name must be string');
  }
  if (!name) {
    throw new Error('name is empty');
  }
  this.name     = name;
  this.children = new List();
  this._map     = {};
}

function getChild(parent, name) {
  var n = parent._map[name];
  if (!n) {
    n = parent._map[name] = new parent.constructor(name);
    parent._add(n);
  }
  return n;
}

Node.prototype = {

  constructor: Node,

  /*
   * Sets the value of the named node. If the node does not exist, it is
   * created and added to the children by calling `_add(node)`. The value is
   * changed by calling `_value(value)`
   */
  set: function (name, value) {
    var n, p = name.indexOf('.');
    if (p === -1) {
      n = getChild(this, name);
      n._value(value);
    } else {
      n = getChild(this, name.substring(0, p));
      n.set(name.substring(p + 1), value);
    }
  },

  /*
   * Returns the value of the named node. If the node does not exist,
   * undefined is returned.
   */
  get: function (name) {
    var n = this.node(name);
    return n ? n.value : undefined;
  },

  /*
   * Returns the named node or undefined if the node does not exist.
   */
  node: function (name) {
    var p = name.indexOf('.');
    if (p === -1) {
      return this._map[name];
    }
    var n = this._map[name.substring(0, p)];
    return n ? n.node(name.substring(p + 1)) : undefined;
  },

  /*
   * Removes the named node. If it has children, the value is deleted. Parent
   * nodes in the path with no value and no remaining children will be removed
   * as well.
   */
  remove: function (name) {
    var n, map = this._map, p = name.indexOf('.');
    if (p === -1) {
      n = map[name];
      if (n) {
        if (n.children.length) {
          delete n.value;
        } else {
          delete map[name];
          this.children.remove(n);
        }
        return true;
      }
    } else {
      var k = name.substring(0, p);
      n = map[k];
      if (n && n.remove(name.substring(p + 1)) && n.value === undefined &&
          !n.children.length) {
        delete map[k];
        this.children.remove(n);
      }
    }
  },

  /*
   * Removes all child nodes.
   */
  removeAll: function () {
    this.children.removeAll();
    this._map = {};
  },

  /*
   * Called by `set` to add a node to the children.
   */
  _add: function (node) {
    this.children.push(node);
  },

  /*
   * Called by `set` to change the value.
   */
  _value: function (value) {
    this.value = value;
  },

  /*
   * Returns a plain object representation of the node and it's children.
   */
  toObject: function () {
    var json = { name : this.name };
    if (this.value !== undefined) {
      json.value = this.value;
    }
    if (this.children.length) {
      json.children = [];
      var c, i = this.children.iterator();
      while ((c = i.next()) !== undefined) {
        json.children.push(c.toObject());
      }
    }
    return json;
  },

  iterator: function () {
    return new Iterator(this);
  }

};

exports.Node = Node;
