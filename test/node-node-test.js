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


function returnsUndefinedPathTest(path) {
  return function () {
    var n = new Node('root');

    var v = n.node(path);

    assert.strictEqual(v, undefined);
  };
}

describe('node.node', function () {

  it('returns the node', function () {
    var n = new Node('root');
    n.set('a.b', 42);

    var v = n.node('a.b');

    assert.equal(v, n._map.a._map.b);
  });

  it('returns undefined if the node does not exist',
      returnsUndefinedPathTest('unknown'));

  it('returns undefined if the deep node does not exist',
      returnsUndefinedPathTest('un.known'));

});
