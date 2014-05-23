import '../src/html';

describe('span', function() {
  var span = null;

  beforeEach(function() {
    span = document.createElement('custom-span');
    document.body.appendChild(span);
  });

  afterEach(function() {
    document.body.removeChild(span);
  });

  // FIXME: This will not hold true until ES6 @@create is implemented:
  // http://w3c.github.io/webcomponents/spec/custom/#es6
  // http://www.whatwg.org/specs/web-apps/current-work/multipage/text-level-semantics.html#the-span-element
  // describe('interface', function() {
  //   it('needs to be HTMLSpanElement', function() {
  //     expect(Object.getPrototypeOf(span).constructor.name).to.equal('CustomHTMLSpanElement');
  //   });
  // });

});
