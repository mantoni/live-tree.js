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


describe('node.iterator', function () {

  it('creates a new iterator', function () {
    var n = new Node('a');
    n.set('b', 42);

    var i = n.iterator();

    assert(i instanceof Iterator);
    assert.equal(i.next().value, 42);
  });

});
