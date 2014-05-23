import html from '../src/html'

describe('div', function(){
  var div = null;

  beforeEach(function(){
    div = document.createElement('custom-div');
    document.body.appendChild(div);
  });

  afterEach(function(){
    document.body.removeChild(div);
  });

  describe('align', function(){

    it('right', function(){
      div.setAttribute('align', 'right');
      var textAlign = window.getComputedStyle(div).getPropertyValue('text-align');
      expect(textAlign).to.equal('right');
    });

  });
});
