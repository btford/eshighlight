var esprima = require('esprima');

var notControlFlow = [
  'var',
  'let',
  'function'
];

var operator = [
  '&&',
  '||',
  '>',
  '<',
  '>=',
  '<=',
  '=',
  '+',
  '-',
  '*',
  '/',
  '!',
  '-=',
  '+=',
  '*=',
  '/=',
  '==',
  '==='
];

var ignoredTypes = {
  punctuator: true
};

module.exports = function highlight (src) {
  var ast = esprima.parse(src, {
    tokens: true,
    range: true,
    comment: true
  });

  tokens = ast.tokens.concat(ast.comments.map(function (comment) {
    comment.type = comment.type + '-comment';
    comment.value = src.slice(comment.range[0], comment.range[1]);
    return comment;
  }));

  tokens = tokens.sort(function (a, b) {
    return a.range[0] < b.range[0] ? -1 : 1;
  });

  var types = {};

  traverse(ast.body, '');

  tokens.forEach(function (token) {
    var type = token.type.toLowerCase();
    var text = token.value;
    if (type === 'keyword' && notControlFlow.indexOf(text) === -1) {
      type = 'control-flow';
    }
    if (type === 'punctuator' && operator.indexOf(text) > -1) {
      type = 'operator';
    }
    var range = types[token.range.join(',')];
    if (range &&
        range.substr(-7) === '.params') {
      token.transformed = span(text, 'param');
    } else {
      token.transformed = ignoredTypes[type] ? text : span(text, type);
    }
  });

  var buffer = tokens[0].transformed;

  for (var i = 1; i < tokens.length; i += 1) {
    // whitespace and stuff
    buffer += src.slice(tokens[i-1].range[1], tokens[i].range[0]);
    buffer += tokens[i].transformed;
  }

  return buffer;

  function traverse (node, type) {
    Object.keys(node).
      forEach(function (prop) {
        if (typeof node[prop] === 'object' && node[prop] !== null) {
          if (node[prop].range) {
            types[node[prop].range.join(',')] = type;
          }
          traverse(node[prop], type + '.' + node.type + '.' + prop);
        }
      });
  }
}



function line (contents) {
  return div(contents, 'line');
}

function div (contents, classes) {
  return elt('div', contents, classes);
}

function span (contents, classes) {
  return elt('span', contents, classes);
}

function elt (name, content, classes) {
  return '<' + name + (classes ? ' class="' + classes + '"' : '') + '>' +
      content +
    '</' + name + '>';
}
