import '../src/html';
var expect = require('chai').expect;

describe('div', () => {
  var div = null;

  beforeEach(() => {
    div = document.createElement('custom-div');
    document.body.appendChild(div);
  });

  afterEach(() => {
    document.body.removeChild(div);
  });

  // http://www.whatwg.org/specs/web-apps/current-work/multipage/rendering.html#flow-content-3
  describe('[align]', () => {
    it('should work when set to left', () => {
      div.setAttribute('align', 'left');
      var textAlign = window.getComputedStyle(div).getPropertyValue('text-align');
      expect(textAlign).to.equal('left');
    });

    it('should work when set to right', () => {
      div.setAttribute('align', 'right');
      var textAlign = window.getComputedStyle(div).getPropertyValue('text-align');
      expect(textAlign).to.equal('right');
    });

    it('should work when set to justify', () => {
      div.setAttribute('align', 'justify');
      var textAlign = window.getComputedStyle(div).getPropertyValue('text-align');
      expect(textAlign).to.equal('justify');
    });
  });

  describe('UA stylesheet', () => {
    it('should have `display: block`', () => {
      var display = window.getComputedStyle(div).getPropertyValue('display');
      expect(display).to.equal('block');
    });
  });
});
