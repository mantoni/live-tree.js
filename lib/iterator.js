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
}

Iterator.prototype = {

  next: function () {
    var n;
    while (true) {
      while ((n = this.i.next()) !== undefined) {
        this.q.push(n.children.iterator());
        if (n.value) {
          return n;
        }
      }
      if (!this.q.length) {
        return;
      }
      this.i = this.q.shift();
    }
  }

};

exports.Iterator = Iterator;
