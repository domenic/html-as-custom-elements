import '../src/html';
const expect = require('chai').expect;

describe('a', () => {
  let a = null;

  beforeEach(() => {
    a = document.createElement('custom-a');
    document.body.appendChild(a);
  });

  afterEach(() => {
    document.body.removeChild(a);
  });

  describe('[href]', () => {
    it('should initially be the empty string', () => {
      expect(a.href).to.equal('');
    });

    it('should resolve relative to the document even before being added to the document', () => {
      a.href = 'index.html';
      expect(a.href).to.equal((new URL('index.html', document.baseURI)).toString());
    });
  });

  describe('toString', () => {
    it('should return the href', () => {
      const href = 'http://example.com/';
      a.href = href;
      expect(a.toString()).to.equal(href);
    });
  });
});
