import '../src/html';

describe('blockquote', () => {
  var blockquote = null;

  beforeEach(() => {
    blockquote = document.createElement('custom-blockquote');
    document.body.appendChild(blockquote);
  });

  afterEach(() => {
    document.body.removeChild(blockquote);
  });

  describe('[cite]', () => {
    it('should be the empty string when not present', () => {
      expect(blockquote.cite).to.equal('');
    });

    it('should be the empty string when present but empty', () => {
      blockquote.setAttribute('cite', '');
      expect(blockquote.cite).to.equal('');
    });

    it('should be the same as the attribute value in other cases', () => {
      blockquote.setAttribute('cite', 'x');
      expect(blockquote.cite).to.equal('x');
    });
  });

  // http://www.whatwg.org/specs/web-apps/current-work/multipage/rendering.html#flow-content-3
  describe('UA stylesheet', () => {
    it('should have `display: block` and the correct margins', () => {
      expect(getComputedStyle(blockquote).display).to.equal('block');

      // 1em
      expect(getComputedStyle(blockquote).marginTop).to.equal('16px');
      expect(getComputedStyle(blockquote).marginBottom).to.equal('16px');

      expect(getComputedStyle(blockquote).marginLeft).to.equal('40px');
      expect(getComputedStyle(blockquote).marginRight).to.equal('40px');
    });
  });
});
