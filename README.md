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
<pre><div class="line"><span class="keyword">var</span> <span class="identifier">x</span> = <span class="numeric">42</span></div></pre>
```

## License
MIT