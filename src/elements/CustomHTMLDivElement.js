// http://www.whatwg.org/specs/web-apps/current-work/#the-div-element
// http://www.whatwg.org/specs/web-apps/current-work/#HTMLDivElement-partial

import { reflectAttr } from '../common';

class CustomHTMLDivElement extends HTMLElement {}
reflectAttr(CustomHTMLDivElement, 'align');

export default CustomHTMLDivElement;
