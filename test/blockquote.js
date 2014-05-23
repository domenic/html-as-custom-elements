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
});
