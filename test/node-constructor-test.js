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
var List   = require('live-list').List;


describe('node.constructor', function () {

  it('sets the given name', function () {
    var n = new Node('abc');

    assert.equal(n.name, 'abc');
  });

  it('throws if name is not a string', function () {
    assert.throws(function () {
      return new Node();
    }, TypeError);
    assert.throws(function () {
      return new Node(null);
    }, TypeError);
    assert.throws(function () {
      return new Node({});
    }, TypeError);
  });

  it('throws if name is empty', function () {
    assert.throws(function () {
      return new Node('');
    }, Error);
  });

  it('creates child list', function () {
    var n = new Node('root');

    assert(n.children instanceof List);
  });

});
