
var highlight = require('../highlight');

describe('highlight', function () {
  it('should work', function () {
    expect(highlight('var x = 42'))
        .toBe('<pre><div class="line"><span class="keyword">var</span> <span class="identifier">x</span> = <span class="numeric">42</span></div></pre>');
  });

  it('should preserve spacing', function () {
    expect(highlight('var   x   = 42'))
        .toBe('<pre><div class="line"><span class="keyword">var</span>   <span class="identifier">x</span>   = <span class="numeric">42</span></div></pre>');
  });

  it('should highlight params', function () {
    expect(highlight('function x (a){}'))
        .toBe('<pre><div class="line"><span class="keyword">function</span> <span class="identifier">x</span> (<span class="param">a</span>){}</div></pre>');
  });

  it('should highlight comments', function () {
    expect(highlight('// hello'))
        .toBe('<pre><div class="line"><span class="line-comment">// hello</span></div></pre>');
  });
});
