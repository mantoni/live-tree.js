/*
 * live-tree.js
 *
 * Copyright (c) 2013 Maximilian Antoni <mail@maxantoni.de>
 *
 * @license MIT
 */
/*globals describe, it, before, after, beforeEach, afterEach*/
'use strict';

var assert   = require('assert');

var Node     = require('../lib/node').Node;
var Iterator = require('../lib/iterator').Iterator;


describe('iterator.hasNext', function () {

  it('returns false by default', function () {
    var n = new Node('a');
    var i = new Iterator(n);

    assert.strictEqual(i.hasNext(), false);
  });

  it('does not return false if there is a child node', function () {
    var n = new Node('a');
    n.set('b', 1);
    var i = new Iterator(n);

    assert.strictEqual(i.hasNext(), true);
  });

  it('returns false after calling next', function () {
    var n = new Node('a');
    n.set('b', 1);
    var i = new Iterator(n);
    i.next();

    assert.strictEqual(i.hasNext(), false);
  });

  it('returns true after calling next', function () {
    var n = new Node('a');
    n.set('b', 1);
    n.set('c', 2);
    var i = new Iterator(n);
    i.next();

    assert.strictEqual(i.hasNext(), true);
  });

});


function toArray(node) {
  var i = new Iterator(node);
  var a = [];
  while (i.hasNext()) {
    a.push(i.next());
  }
  return a;
}


describe('iterator.next', function () {

  it('throws by default', function () {
    var n = new Node('a');
    var i = new Iterator(n);

    assert.throws(function () {
      i.next();
    }, Error);
  });

  it('returns the iterated node value', function () {
    var n = new Node('a');
    n.set('b', 1);
    var i = new Iterator(n);

    assert.strictEqual(i.next(), n._map.b);
  });

  it('ignored nodes without a value', function () {
    var n = new Node('a');
    n.set('b.c', 1);

    var i = new Iterator(n);

    assert.strictEqual(i.next(), n._map.b._map.c);
  });

  it('iterates level order, then insert order', function () {
    var n = new Node('a');
    n.set('c.d', 3);
    n.set('c', 1);
    n.set('f', 2);

    assert.deepEqual(toArray(n), [n._map.c, n._map.f, n._map.c._map.d]);
  });

  it('does not return the previous value on second next call', function () {
    var n = new Node('a');
    n.set('c.d', 1);
    n.set('c.e', 2);

    var i = new Iterator(n);

    assert.equal(i.next().value, 1);
    assert.equal(i.next().value, 2);
  });

});
