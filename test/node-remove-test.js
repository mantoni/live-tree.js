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

function removeParentTest(value) {
  return function () {
    var p = new Node('a');
    p.set('b.c', 42);
    p.set('b', value);

    p.remove('b.c');

    assert.deepEqual(p.toObject(), {
      name     : 'a',
      children : [{
        name   : 'b',
        value  : value
      }]
    });
  };
}

describe('node.remove', function () {

  it('removes the named node', function () {
    var p = new Node('p');
    p.set('c', 42);

    p.remove('c');

    assert.deepEqual(p.toObject(), { name : 'p' });
    assert(!p._map.hasOwnProperty('c'));
  });

  it('removes the deep named node', function () {
    var p = new Node('a');
    p.set('b.c', 42);

    p.remove('b.c');

    assert.deepEqual(p.toObject(), {
      name : 'a'
    });
    assert(!p._map.hasOwnProperty('b'));
  });

  it('does not remove parent if it has a value of false',
     removeParentTest(false));

  it('does not remove parent if it has a value of null',
      removeParentTest(null));

  it('does not remove node if it has children', function () {
    var p = new Node('a');
    p.set('b.c', 42);
    p.set('b', 7);

    p.remove('b');

    assert.deepEqual(p.toObject().children, [{
      name     : 'b',
      children : [{
        name   : 'c',
        value  : 42
      }]
    }]);
  });

  it('does not remove parent if it has other children', function () {
    var p = new Node('a');
    p.set('b.c', 42);
    p.set('b.d', 7);

    p.remove('b.c');

    assert.deepEqual(p.toObject().children, [{
      name     : 'b',
      children : [{
        name   : 'd',
        value  : 7
      }]
    }]);
  });

  it('does not remove parent if child does not exist', function () {
    var p = new Node('a');
    p.set('b.c', 7);

    p.remove('b.d');

    assert.deepEqual(p.toObject().children, [{
      name     : 'b',
      children : [{
        name   : 'c',
        value  : 7
      }]
    }]);
  });

  it('does not throw if node does not exist', function () {
    var n = new Node('p');

    assert.doesNotThrow(function () {
      n.remove('unknown');
    });
  });

  it('does not throw if deep node does not exist', function () {
    var n = new Node('p');

    assert.doesNotThrow(function () {
      n.remove('un.known');
    });
  });

});
