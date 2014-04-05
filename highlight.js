var esprima = require('esprima');


var ignoredTypes = {
  punctuator: true
};

module.exports = function highlight (src) {
  var ast = esprima.parse(src, {
    tokens: true,
    range: true
  });

  var tokens = ast.tokens;

  var types = {};

  traverse(ast.body, '')

  tokens.forEach(function (token) {
    var type = token.type.toLowerCase();
    var range = types[token.range.join(',');
    if (range] &&
        range].substr(-7) === '.params'
        ) {

      token.transformed = span(token.value, 'param');
    } else {
      token.transformed = ignoredTypes[type] ? token.value : span(token.value, type);
    }
  });

  var buffer = tokens[0].transformed;

  for (var i = 1; i < tokens.length; i += 1) {
    // whitespace and stuff
    buffer += src.slice(tokens[i-1].range[1], tokens[i].range[0]);
    buffer += tokens[i].transformed;
  }

  buffer = buffer.split('\n').map(line).join('\n');

  buffer = pre(buffer);

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

function pre (contents, classes) {
  return elt('pre', contents, classes);
}

function elt (name, content, classes) {
  return '<' + name + (classes ? ' class="' + classes + '"' : '') + '>' +
      content +
    '</' + name + '>';
}
