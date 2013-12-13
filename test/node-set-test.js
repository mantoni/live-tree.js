/*
 * live-tree.js
 *
 * Copyright (c) 2013 Maximilian Antoni <mail@maxantoni.de>
 *
 * @license MIT
 */
/*globals describe, it, before, after, beforeEach, afterEach*/
'use strict';

var assert = require('assert');

var Node   = require('../lib/node').Node;


describe('node._add', function () {

  it('appends a new node to the children', function () {
    var node = new Node('a');

    node._add(new Node('b'));

    assert.equal(node.children.length, 1);
    assert.equal(node.children.iterator().next().name, 'b');
  });

});


describe('node._value', function () {

  it('sets the value of the node', function () {
    var node = new Node('a');

    node._value(42);

    assert.equal(node.value, 42);
  });

});


describe('node.set', function () {

  it('creates and adds a child node with the given name', function () {
    var p = new Node('p');

    p.set('c');

    assert.equal(p.children.length, 1);
    assert.equal(p.children.iterator().next().name, 'c');
  });

  it('invokes _add', function () {
    var c = false;
    var p = new Node('p');
    p._add = function () { c = true; };

    p.set('c');

    assert(c);
  });

  it('creates a series of child nodes', function () {
    var p = new Node('p');

    p.set('a.b.c');

    assert.deepEqual(p.toObject().children, [{
      name       : 'a',
      children   : [{
        name     : 'b',
        children : [{
          name   : 'c'
        }]
      }]
    }]);
  });

  it('sets the value of the specified node', function () {
    var p = new Node('p');

    p.set('a.b', 42);

    assert.deepEqual(p.toObject().children, [{
      name     : 'a',
      children : [{
        name   : 'b',
        value  : 42
      }]
    }]);
  });

  it('replaces replaces an existing nodes value', function () {
    var p = new Node('p');

    p.set('a.b', 42);
    p.set('a.b', 7);

    assert.deepEqual(p.toObject().children, [{
      name     : 'a',
      children : [{
        name   : 'b',
        value  : 7
      }]
    }]);
  });

  it('invokes _value', function () {
    var a = null;
    var c = false;
    var p = new Node('p');
    p.set('a');
    p._map.a._value = function (arg) { c = true; a = arg; };

    p.set('a', 42);

    assert(c);
    assert.equal(a, 42);
  });

  it('uses the constructor to create new node instances', function () {
    function Derived(name) {
      Node.call(this, name);
    }
    Derived.prototype = Object.create(Node.prototype);
    Derived.prototype.constructor = Derived;

    var n = new Derived('root');
    n.set('x');

    assert(n._map.x instanceof Derived);
  });
});
