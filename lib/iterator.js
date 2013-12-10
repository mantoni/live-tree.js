/*
 * live-tree.js
 *
 * Copyright (c) 2013 Maximilian Antoni <mail@maxantoni.de>
 *
 * @license MIT
 */
'use strict';

function Iterator(node) {
  this.q = [];
  this.i = node.children.iterator();
  this.n = null;
}

Iterator.prototype = {

  hasNext: function () {
    var n;
    while (this.i.hasNext()) {
      n = this.n = this.i.next();
      this.q.push(n.children.iterator());
      if (n.value !== undefined) {
        return true;
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
