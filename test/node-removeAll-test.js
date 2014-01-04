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


describe('node.removeAll', function () {

  it('removes all child nodes', function () {
    var p = new Node('p');
    p.set('a', 1);
    p.set('b', 2);
    p.set('c', 3);

    p.removeAll();

    assert.deepEqual(p.toObject(), { name : 'p' });
    assert(!p._map.hasOwnProperty('a'));
    assert(!p._map.hasOwnProperty('b'));
    assert(!p._map.hasOwnProperty('c'));
  });

});
