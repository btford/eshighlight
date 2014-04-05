
var highlight = require('../highlight');

describe('highlight', function () {
  it('should work', function () {
    expect(highlight('var x = 42'))
        .toBe('<span class="keyword">var</span> <span class="identifier">x</span> <span class="operator">=</span> <span class="numeric">42</span>');
  });

  it('should preserve spacing', function () {
    expect(highlight('var   x   = 42'))
        .toBe('<span class="keyword">var</span>   <span class="identifier">x</span>   <span class="operator">=</span> <span class="numeric">42</span>');
  });

  it('should highlight params', function () {
    expect(highlight('function x (a){}'))
        .toBe('<span class="keyword">function</span> <span class="identifier">x</span> (<span class="param">a</span>){}');
  });

  it('should highlight control flow', function () {
    expect(highlight('if (x) y();'))
        .toBe('<span class="control-flow">if</span> (<span class="identifier">x</span>) <span class="identifier">y</span>();');
  });

  it('should highlight comments', function () {
    expect(highlight('// hello'))
        .toBe('<span class="line-comment">// hello</span>');
  });
});
