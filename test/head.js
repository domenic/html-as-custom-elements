describe('head', () => {
  var head = null;

  beforeEach(() => {
    head = document.createElement('custom-head');
    document.body.appendChild(head);
  });

  afterEach(() => {
    document.body.removeChild(head);
  });

  // http://www.whatwg.org/specs/web-apps/current-work/multipage/rendering.html#hidden-elements
  describe('UA stylesheet', () => {
    it('should have `display: none`', () => {
      expect(getComputedStyle(head).display).to.equal('none');
    });
  });
});
