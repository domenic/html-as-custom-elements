import registerElement from './register-element';

import CustomHTMLDivElement from './elements/CustomHTMLDivElement';
import CustomHTMLHeadElement from './elements/CustomHTMLHeadElement';
import CustomHTMLHRElement from './elements/CustomHTMLHRElement';
import CustomHTMLQuoteElement from './elements/CustomHTMLQuoteElement';
import CustomHTMLSpanElement from './elements/CustomHTMLSpanElement';
import CustomHTMLAnchorElement from './elements/CustomHTMLAnchorElement';

import './elements/CustomHTMLMediaElement';
import CustomHTMLAudioElement from './elements/CustomHTMLAudioElement';

registerElement('custom-blockquote', CustomHTMLQuoteElement);
registerElement('custom-div', CustomHTMLDivElement);
registerElement('custom-head', CustomHTMLHeadElement);
registerElement('custom-hr', CustomHTMLHRElement);
registerElement('custom-span', CustomHTMLSpanElement);
registerElement('custom-a', CustomHTMLAnchorElement);

registerElement('custom-audio', CustomHTMLAudioElement);
