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


function toArray(n) {
  var i = new Iterator(n);
  var a = [];
  while ((n = i.next()) !== undefined) {
    a.push(n.value);
  }
  return a;
}


describe('iterator.next', function () {

  it('returns undefined by default', function () {
    var n = new Node('a');
    var i = new Iterator(n);

    assert.strictEqual(i.next(), undefined);
  });

  it('returns first node', function () {
    var n = new Node('a');
    n.set('b', 1);
    var i = new Iterator(n);

    assert.strictEqual(i.next(), n._map.b);
  });

  it('returns undefined after calling next', function () {
    var n = new Node('a');
    n.set('b', 1);
    n.set('c', 2);
    var i = new Iterator(n);

    assert.strictEqual(i.next(), n._map.b);
    assert.strictEqual(i.next(), n._map.c);
    assert.strictEqual(i.next(), undefined);
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

    assert.deepEqual(toArray(n), [1, 2, 3]);
  });

  it('invokes the filter function with each node', function () {
    var a = [];
    var n = new Node('a');
    var i = new Iterator(n, function (x) {
      a.push(x.name);
      return true;
    });
    n.set('b', 1);
    n.set('c.d', 2);

    n = i.next();
    while (n) { n = i.next(); }

    assert.deepEqual(a, ['b', 'd']);
  });

  it('does not return node if filter returns false', function () {
    var n = new Node('a');
    var i = new Iterator(n, function () {
      return false;
    });
    n.set('b', 1);

    assert.strictEqual(i.next(), undefined);
  });

  it('does not pass children to filter if it returned false', function () {
    var a = [];
    var n = new Node('a');
    var i = new Iterator(n, function (x) {
      a.push(x.name);
      return false;
    });
    n.set('b', 1);
    n.set('b.c', 2);

    n = i.next();
    while (n) { n = i.next(); }

    assert.deepEqual(a, ['b']);
  });

  it('passes children to filter but not parent if it retuned null',
    function () {
      var n = new Node('a');
      var i = new Iterator(n, function (x) {
        return x.name === 'b' ? null : true;
      });
      n.set('b', 1);
      n.set('b.c', 2);

      assert.deepEqual(i.next().value, 2);
      assert.strictEqual(i.next(), undefined);
    });

});
