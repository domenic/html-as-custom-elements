describe('span', () => {
  var span = null;

  beforeEach(() => {
    span = document.createElement('custom-span');
    document.body.appendChild(span);
  });

  afterEach(() => {
    document.body.removeChild(span);
  });

  // FIXME: This will not hold true until ES6 @@create is implemented:
  // http://w3c.github.io/webcomponents/spec/custom/#es6
  // http://www.whatwg.org/specs/web-apps/current-work/multipage/text-level-semantics.html#the-span-element
  describe.skip('interface', () => {
    it('should be CustomHTMLSpanElement', () => {
      expect(Object.getPrototypeOf(span).constructor.name).to.equal('CustomHTMLSpanElement');
    });
  });
});
