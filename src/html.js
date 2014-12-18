import registerElement from './register-element.js';

import CustomHTMLDivElement from './elements/CustomHTMLDivElement.js';
import CustomHTMLHeadElement from './elements/CustomHTMLHeadElement.js';
import CustomHTMLHRElement from './elements/CustomHTMLHRElement.js';
import CustomHTMLQuoteElement from './elements/CustomHTMLQuoteElement.js';
import CustomHTMLSpanElement from './elements/CustomHTMLSpanElement.js';
import CustomHTMLAnchorElement from './elements/CustomHTMLAnchorElement.js';

import './elements/CustomHTMLMediaElement.js';
import CustomHTMLAudioElement from './elements/CustomHTMLAudioElement.js';

registerElement('custom-blockquote', CustomHTMLQuoteElement);
registerElement('custom-div', CustomHTMLDivElement);
registerElement('custom-head', CustomHTMLHeadElement);
registerElement('custom-hr', CustomHTMLHRElement);
registerElement('custom-span', CustomHTMLSpanElement);
registerElement('custom-a', CustomHTMLAnchorElement);

registerElement('custom-audio', CustomHTMLAudioElement);
