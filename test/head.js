import '../src/html';

describe('head', function() {
  var head = null;

  beforeEach(function() {
    head = document.createElement('custom-head');
    document.body.appendChild(head);
  });

  afterEach(function() {
    document.body.removeChild(head);
  });

  // http://www.whatwg.org/specs/web-apps/current-work/multipage/rendering.html#hidden-elements
  describe('Display', function() {
    it('should be display none', function() {
      expect(getComputedStyle(head).display).to.equal('none');
    });
  });
});
