import { setTheInput } from './URLUtils-impl.js';
import { setAll as setPrivateMethods } from '../private-methods.js';

export default class CustomHTMLAnchorElementImpl {
  createdCallback() {
    doSetTheInput(this);

    addDefaultEventListener(this, 'click', () => window.location.href = this.href);
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

// This might be more generally useful; if so factor it out into its own file.
function addDefaultEventListener(eventTarget, eventName, listener) {
  eventTarget.addEventListener(eventName, e => {
    setTimeout(() => {
      if (!e.defaultPrevented) {
        listener(e);
      }
    }, 0);
  });
}
