# eshighlight [![Build Status](https://travis-ci.org/btford/eshighlight.png?branch=master)](https://travis-ci.org/btford/eshighlight)

JavaScript code highlighter based on [esprima](http://esprima.org/).

## Install

```
npm install eshighlight
```


## Usage

Takes a JavaScript string, returns an html string.

```javascript
var highlight = require('eshighlight');

highlight('var x = 42');
```

which returns:

```html
<span class="keyword">var</span> <span class="identifier">x</span> = <span class="numeric">42</span>
```


## Prior Art

Before writing this, I looked at these solutions:

* [highlight.js](http://highlightjs.org/)
* [google-code-prettify](https://code.google.com/p/google-code-prettify/)

The main motivation for this library was so I can make my blog to look like sublime.
None of the highlighters I looked at let you color parameters.
I want that nice orange on my params yo.

I didn't like that they all only tokenized rather than doing a proper parse.
I think the parse tree approach might be interesting.

Compared to highlight.js and google-code-prettify, `eshighlight` has the drawbacks that it does not support languages besides JavaScript and only works in node.


## License
MIT
