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
  this.n = null;
  this.f = filter;
}

Iterator.prototype = {

  hasNext: function () {
    var n, h;
    while (this.i.hasNext()) {
      n = this.n = this.i.next();
      h = n.value === undefined ? null : (this.f ? this.f(n) : true);
      if (h !== false) {
        this.q.push(n.children.iterator());
        if (h) {
          return true;
        }
      }
    }
    if (this.q.length) {
      this.i = this.q.shift();
      return this.hasNext();
    }
    return false;
  },

  next: function () {
    if (!this.n && !this.hasNext()) {
      throw new Error('no such element');
    }
    var n = this.n;
    this.n = null;
    return n;
  }

};

exports.Iterator = Iterator;
