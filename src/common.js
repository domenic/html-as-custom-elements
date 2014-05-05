// If elements just did e.g. `this.setAttribute(x, y)`, then they would not be
// robust to per-element tampering. For example, if `CustomHTMLDivElement`'s
// `align` getter used `this.getAttribute('align')` directly, then doing e.g.
// `divEl.getAttribute = null` would break `console.log(divEl.align)`.

var protoGetAttribute = HTMLElement.prototype.getAttribute;
var protoSetAttribute = HTMLElement.prototype.setAttribute;

export function getAttr(el, name) {
  return protoGetAttribute.call(el, name);
};

export function setAttr(el, name, value) {
  return protoSetAttribute.call(el, name, value);
};

export function reflectAttr(constructor, attrName, propertyName = attrName) {
  Object.defineProperty(constructor.prototype, propertyName, {
    enumerable: true,
    configurable: true,
    get() {
      return getAttr(this, attrName);
    },
    set(value) {
      return setAttr(this, attrName, value);
    }
  });
};
