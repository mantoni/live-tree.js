/*
 * live-tree.js
 *
 * Copyright (c) 2013 Maximilian Antoni <mail@maxantoni.de>
 *
 * @license MIT
 */
'use strict';

function Iterator(node, filter) {
  this.q = [];
  this.i = node.children.iterator();
  this.f = filter;
}

Iterator.prototype = {

  next: function () {
    var n, h;
    while ((n = this.i.next()) !== undefined) {
      h = n.value === undefined ? null : (this.f ? this.f(n) : true);
      if (h !== false) {
        this.q.push(n.children.iterator());
        if (h) {
          return n;
        }
      }
    }
    if (this.q.length) {
      this.i = this.q.shift();
      return this.next();
    }
  }

};

exports.Iterator = Iterator;
