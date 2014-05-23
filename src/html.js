import CustomHTMLDivElement from './elements/CustomHTMLDivElement';
import CustomHTMLHeadElement from './elements/CustomHTMLHeadElement';
import CustomHTMLQuoteElement from './elements/CustomHTMLQuoteElement';
import CustomHTMLSpanElement from './elements/CustomHTMLSpanElement';

// Register elements
document.registerElement('custom-blockquote', CustomHTMLQuoteElement);
document.registerElement('custom-div', CustomHTMLDivElement);
document.registerElement('custom-head', CustomHTMLHeadElement);
document.registerElement('custom-span', CustomHTMLSpanElement);
