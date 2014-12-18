// Many classes need "private methods," i.e. "methods" that are not user-exposed but can still be called by specs.
// For example, `HTMLAnchorElement` has a "get the base" procedure which is best described as a private method, and is
// called by `URLUtils`.
//
// Our approach for these is to have a registry, keyed by class name, of private methods. This module exports functions
// for getting and calling private methods of a given instance (by using the instance's class name to look them up),
// and for manipulating the private methods registered for a given class name.

var privateMethods = Object.create(null);

// In the examples that follow assume `import * as privateMethods from './private-methods.js'`.

// Example: `privateMethods.get(customAElement, 'getTheBase')`
export function get(obj, methodName) {
  return privateMethods[obj.constructor.name][methodName];
}

// Example: `privateMethods.call(customAElement, 'getTheBase')`
export function call(obj, methodName, ...args) {
  // In the future this could be done by a tamper-proof brand lookup and a Map instead of using .constructor.name.
  return privateMethods[obj.constructor.name][methodName].apply(obj, args);
}

// Example: `privateMethods.setAll('CustomHTMLAnchorElement', { getTheBase() { ... }, createdCallback() { ... } })`
export function setAll(constructorName, methods) {
  privateMethods[constructorName] = Object.assign(Object.create(null), methods);
}

// Example: `privateMethods.getAll('CustomHTMLAnchorElement')
export function getAll(constructorName) {
  return privateMethods[constructorName];
}
