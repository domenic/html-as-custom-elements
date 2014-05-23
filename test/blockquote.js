import '../src/html';

describe('blockquote', function() {
  var blockquote = null;

  beforeEach(function() {
    blockquote = document.createElement('custom-blockquote');
    document.body.appendChild(blockquote);
  });

  afterEach(function() {
    document.body.removeChild(blockquote);
  });

  describe('cite', function() {
    it('no attr', function() {
      expect(blockquote.cite).to.equal('');
    });

    it('empty', function() {
      blockquote.setAttribute('cite', '');
      expect(blockquote.cite).to.equal('');
    });

    it('x', function() {
      blockquote.setAttribute('cite', 'x');
      expect(blockquote.cite).to.equal('x');
    });
  });

  // http://www.whatwg.org/specs/web-apps/current-work/multipage/rendering.html#flow-content-1
  describe('UA stylesheet', function() {
    it('should have', function() {
      expect(getComputedStyle(blockquote).display).to.equal('block');

      // 1em
      expect(getComputedStyle(blockquote).marginTop).to.equal('16px');
      expect(getComputedStyle(blockquote).marginBottom).to.equal('16px');

      expect(getComputedStyle(blockquote).marginLeft).to.equal('40px');
      expect(getComputedStyle(blockquote).marginRight).to.equal('40px');
    });
  });
});
