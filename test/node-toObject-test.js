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


describe('node.toObject', function () {

  it('returns object with name', function () {
    var node = new Node('abc');

    var json = node.toObject();

    assert.deepEqual(json, { name : 'abc' });
  });

  it('returns the value', function () {
    var node = new Node('abc');
    node.value = 123;

    var json = node.toObject();

    assert.equal(json.value, 123);
  });

  it('returns false value', function () {
    var node = new Node('abc');
    node.value = false;

    var json = node.toObject();

    assert.equal(json.value, false);
  });

  it('returns null value', function () {
    var node = new Node('abc');
    node.value = null;

    var json = node.toObject();

    assert.equal(json.value, null);
  });

  it('returns children', function () {
    var node = new Node('abc');

    node.children.push(new Node('a'));
    node.children.push(new Node('b'));

    var json = node.toObject();

    assert.deepEqual(json.children, [{ name : 'a' }, { name : 'b' }]);
  });

});
