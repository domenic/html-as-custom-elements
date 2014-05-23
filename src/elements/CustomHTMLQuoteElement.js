// http://www.whatwg.org/specs/web-apps/current-work/#the-blockquote-element
// http://www.whatwg.org/specs/web-apps/current-work/#htmlquoteelement

import {reflectAttr} from '../common';

class CustomHTMLQuoteElement extends HTMLElement {}
reflectAttr(CustomHTMLQuoteElement, 'cite');

export default CustomHTMLQuoteElement;
