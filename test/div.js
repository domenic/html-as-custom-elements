import '../src/html';

describe('div', function() {
  var div = null;

  beforeEach(function() {
    div = document.createElement('custom-div');
    document.body.appendChild(div);
  });

  afterEach(function() {
    document.body.removeChild(div);
  });

  // http://www.whatwg.org/specs/web-apps/current-work/multipage/rendering.html#flow-content-1
  describe('align', function() {

    it('left', function() {
      div.setAttribute('align', 'left');
      var textAlign = window.getComputedStyle(div).getPropertyValue('text-align');
      expect(textAlign).to.equal('left');
    });

    it('right', function() {
      div.setAttribute('align', 'right');
      var textAlign = window.getComputedStyle(div).getPropertyValue('text-align');
      expect(textAlign).to.equal('right');
    });

    it('justify', function() {
      div.setAttribute('align', 'justify');
      var textAlign = window.getComputedStyle(div).getPropertyValue('text-align');
      expect(textAlign).to.equal('justify');
    });
  });
});
