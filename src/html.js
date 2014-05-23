import CustomHTMLDivElement from './elements/CustomHTMLDivElement';
import CustomHTMLQuoteElement from './elements/CustomHTMLQuoteElement';
import CustomHTMLSpanElement from './elements/CustomHTMLSpanElement';

// Register elements
document.registerElement('custom-div', CustomHTMLDivElement);
document.registerElement('custom-blockquote', CustomHTMLQuoteElement);
document.registerElement('custom-span', CustomHTMLSpanElement);
