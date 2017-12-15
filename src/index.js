const awaitVisitor = {
  Function(path) {
    path.skip();
  },

  AwaitExpression(path) {
    path.replaceWith(
      path.get("argument").node,
    );
  }
};

const getRidOfAsyncAwait = function(path, file) {
  path.traverse(awaitVisitor, {
    file
  });

  path.node.async = false;
}


export default function(api, options) {
  return {
    visitor: {
      Function(path, state) {
        if (!path.node.async || path.node.generator) return;
        getRidOfAsyncAwait(path, state.file);
      },
    },
  };
}
