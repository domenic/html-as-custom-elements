// http://www.whatwg.org/specs/web-apps/current-work/#the-div-element
// http://www.whatwg.org/specs/web-apps/current-work/#HTMLDivElement-partial

import { getAttr, setAttr } from '../common';

export default class extends HTMLElement {
  get align() {
    return getAttr(this, 'align');
  }
  set align(value) {
    setAttr(this, 'align', value);
  }
}

