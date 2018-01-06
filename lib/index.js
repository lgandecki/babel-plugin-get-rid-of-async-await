"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (api, options) {
  return {
    inherits: require("babel-plugin-syntax-async-functions"),
    visitor: {
      Function: function Function(path, state) {
        if (!path.node.async || path.node.generator) return;
        if (state.opts.onlyInPath) {
          var doNotParse = !state.opts.onlyInPath.some(function (pathToParse) {
            return state.file.opts.filename.indexOf(pathToParse) !== -1;
          });
          if (doNotParse) {
            return;
          }
        }
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