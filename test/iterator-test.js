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


function toArray(n) {
  var i = new Iterator(n);
  var a = [];
  while (i.hasNext()) {
    a.push(i.next().value);
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

    assert.deepEqual(toArray(n), [1, 2, 3]);
  });

  it('does not return the previous value on second next call', function () {
    var n = new Node('a');
    n.set('c.d', 1);
    n.set('c.e', 2);

    var i = new Iterator(n);

    assert.equal(i.next().value, 1);
    assert.equal(i.next().value, 2);
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

    while (i.hasNext()) {
      i.next();
    }

    assert.deepEqual(a, ['b', 'd']);
  });

  it('does not return node if filter returns false', function () {
    var n = new Node('a');
    var i = new Iterator(n, function () {
      return false;
    });
    n.set('b', 1);

    assert.strictEqual(i.hasNext(), false);
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

    while (i.hasNext()) {
      i.next();
    }

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
      assert.strictEqual(i.hasNext(), false);
    });

});
