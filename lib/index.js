"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (api, options) {
  return {
    visitor: {
      Function: function Function(path, state) {
        if (!path.node.async || path.node.generator) return;
        getRidOfAsyncAwait(path, state.file);
      }
    }
  };
};

var awaitVisitor = {
  Function: function Function(path) {
    path.skip();
  },
  AwaitExpression: function AwaitExpression(path) {
    path.replaceWith(path.get("argument").node);
  }
};

var getRidOfAsyncAwait = function getRidOfAsyncAwait(path, file) {
  path.traverse(awaitVisitor, {
    file: file
  });

  path.node.async = false;
};