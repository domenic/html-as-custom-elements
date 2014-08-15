import CustomHTMLDivElement from './elements/CustomHTMLDivElement';
import CustomHTMLHeadElement from './elements/CustomHTMLHeadElement';
import CustomHTMLHRElement from './elements/CustomHTMLHRElement';
import CustomHTMLQuoteElement from './elements/CustomHTMLQuoteElement';
import CustomHTMLSpanElement from './elements/CustomHTMLSpanElement';

document.registerElement('custom-blockquote', CustomHTMLQuoteElement);
document.registerElement('custom-div', CustomHTMLDivElement);
document.registerElement('custom-head', CustomHTMLHeadElement);
document.registerElement('custom-hr', CustomHTMLHRElement);
document.registerElement('custom-span', CustomHTMLSpanElement);
