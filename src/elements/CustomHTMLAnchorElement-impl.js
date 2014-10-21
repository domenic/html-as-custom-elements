import { setTheInput } from './URLUtils-impl.js';
import { setAll as setPrivateMethods } from './private-methods.js';

export default class CustomHTMLAnchorElementImpl {
  createdCallback() {
    doSetTheInput(this);
  }

  attributeChangedCallback(name) {
    if (name === 'href') {
      doSetTheInput(this);
    }
  }

  get text() {
    return this.textContent;
  }
  set text(v) {
    this.textContent = v;
  }
}

setPrivateMethods('CustomHTMLAnchorElement', {
  // Required by URLUtils
  getTheBase() {
    return this.baseURI;
  },
  updateSteps(value) {
    this.setAttribute('href', value);
  }
});

function doSetTheInput(el) {
  var urlInput = el.hasAttribute('href') ? el.getAttribute('href') : '';
  setTheInput(el, urlInput);
}
