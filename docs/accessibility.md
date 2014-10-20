# Gap Analysis: Accessibility

Custom elements do not have the same capabilities as native elements with regard to how they interface with accessibility technologies and appear in the accessibility tree. This document explains the problem in some detail, and discusses potential solutions.

## Introduction to the Problems

### Problem 1: Exposure in Accessibility Tree

Native elements generate certain structures in the accessibility tree, whereas custom elements are invisible to it. For example, even a simple `<p>` element [will manifest with `IA2_ROLE_PARAGRAPH`, `ATK_ROLE_PARAGRAPH`, etc.](http://rawgit.com/w3c/aria/master/html-aam/html-aam.html#el-p)

In contrast, a custom element will in general appear the same as a `<div>` or `<span>`. That is, it will show up as `IA2_ROLE_SECTION`. (If you use the `is=""` syntax, e.g. `<p is="custom-p">`, it will show up as the role of the actual tag name.)

So: from the perspective of accessibility, you can't even faithfully create a `<custom-p>`! Worse, you cannot faithfully recreate *any* elements except those that map to `IA2_ROLE_SECTION`, viz. `<div>` and `<blockquote>`. So HTML as Custom Elements is pretty doomed in this regard.

This problem isn't confined to roles, either. The same problem recurs with states and properties. For example, a `<details>` element shows up in the tree either `STATE_SYSTEM_EXPANDED` or `STATE_SYSTEM_COLLAPSED` depending on whether its `open` attribute is present or absent, but there is no way for a custom element to achieve this effect.

Finally, there's the fact that native elements have sometimes-complex algorithms present for [determining their accessible name and description](http://rawgit.com/w3c/aria/master/html-aam/html-aam.html#accessible-name-and-description-calculation).

So in summary this is really three problems:

- Role
- States and properties
- Accessible name and description

### Problem 2: Manipulation By Accessibility Technology

Native elements can be manipulated by accessibility technology in ways that custom elements cannot. For example, an `<input type="range">` element announces that it is manipulable, and exposes hooks to accessibility technology for manipulating it. Custom elements have no way to express that they can be manipulated in this fashion.

I haven't looked in to this very much, mainly because it is not as well-documented as problem 1.

## Incomplete Mitigation Strategies

These problems can sometimes be worked around in the context of custom elements, but not in a way that faithfully emulates the behavior of a native element. And in many cases there are abilities simply outside the reach of current APIs.

For example, an element could attempt to use ARIA attributes to expose itself to the accessibility tree. That is, in its `createdCallback`, it could do `this.setAttribute("role", "separator")`. This is observably quite different from how `<hr>` (which is specified to have strong native semantics of a `separator` role) is supposed to behave, since the `role` attribute now appears in the DOM!

Similarly, for accessible name and description, you can set `aria-labelledby` and `aria-describedby` attributes, but this has the side effect of modifying your DOM tree, instead of providing a default that can be overridden by developers.

Worse, there are many, many accessibility signals that do not correspond to ARIA roles, states, or properties. For example, the `<p>` element is exposed with `IA2_ROLE_PARAGRAPH`, but there is no ARIA role for paragraphs. Similarly for `<figcaption>` and many others.

## Toward a Solution: Roles

It would be ideal to have some API to set an element's "default" role, i.e., the role that is exposed in the accessibility tree if it is not overridden by the developer. Notably, it seems that (from testing Chrome, at least, with chrome://accessibility/) roles are set at the time of the element's insertion into the DOM; modifying the `role` attribute afterward does not change anything. So, perhaps this should be associated with the custom elements' `attachedCallback`?

A simple strawperson suggestion is that each element class has a `implicitAriaRole()` method, e.g. `HTMLParagraphElement.prototype.implicitAriaRole()`, which computes the implicit ARIA role for the element. Then, at inserted-into-document time, the role that is exposed to the accessibility tree is `this.implicitAriaRole() || this.getAttribute("role")`. (Note that we use a method instead of a static string to allow computation, e.g. an `<a>` element has a different role depending on whether it has an `href` attribute present or not.)

Relatedly, it would be really useful to have a way of getting an element's "computed" role, i.e. the role exposed to screen readers. This was recently discussed [on public-pfwg@w3.org](http://lists.w3.org/Archives/Public/public-pfwg/2014Oct/thread.html#msg120). It would be mandatory if we were to write cross-browser tests of the accessibility semantics of such custom elements.

However, both of these suggestions sidestep the issue that ARIA roles do not map cleanly to all accessibility technologies, as noted above: there is no role for paragraphs or captions. I think the solution here is simply to expand the list of ARIA roles until they can encompass all existing HTML semantics.

## Toward a Solution: States and Properties

A similar situation occurs for states and properties; however, they are notably mutable throughout the lifetime of the document, even after the element is inserted into the DOM. Additionally, they cannot be overridden by developers: for example `<details open aria-expanded="false">` should still be exposed to accessibility technologies as `STATE_SYSTEM_EXPANDED` and not `STATE_SYSTEM_COLLAPSED`.

A strawperson for this would be adding a `setEnforcedAriaStatesAndProperties()` method to `Element.prototype`. This would generally be called in two scenarios: during element construction, and when the element needs to change its state (e.g. when the user clicks on a `<details>` and closes it.) When this is called, the part of the accessibility tree would need to be refreshed. This has the drawback of giving developers the ability to muck with the enforced states and properties of any element on the page; to mitigate this something like [the revealing constructor pattern](http://domenic.me/2014/02/13/the-revealing-constructor-pattern/) could be used so that developers can only manipulate states and properties of custom elements which they register.

As before, a `getComputedAriaStatesAndProperties()` could be quite useful.

It is again unclear whether the existing vocabulary of ARIA states and properties is sufficient to encompass the richness of existing HTML elements. But again, I think the solution is just to expand the vocabulary until it is.

## Toward a Solution: Accessible Name and Description

Pretty similar. Strawperson: string-returning `HTMLParagraphElement.prototype.implicitAriaLabel()` and `HTMLParagraphElement.prototype.implicitAriaDescription()`, like role. The UA's algorithm becomes something like

```js
function getAccessibleName(el) {
  var labelledBy = el.getAttribute("aria-labelledby");
  if (labelledBy !== null) {
    return getTextFrom(labelledBy); // http://www.w3.org/TR/wai-aria/roles#namecalculation
  }

  var label = el.getAttribute("aria-label");
  if (label) {
    return label;
  }

  return el.implicitAriaLabel();
}

function getAccessibleDescription(el) {
  var describedBy = el.getAttribute("aria-describedby");
  if (describedBy !== null) {
    return getTextFrom(describedBy); // http://www.w3.org/TR/wai-aria/roles#namecalculation
  }

  return el.implicitAriaDescription();
}
```

and for example according to [`img` element Accessible Name Calculation](http://rawgit.com/w3c/aria/master/html-aam/html-aam.html#img-element-accessible-name-calculation) the UA defines

```js
HTMLImageElement.prototype.implicitAriaLabel = function () {
  if (this.hasAttribute("alt")) {
    return this.getAttribute("alt");
  }
  if (this.hasAttribute("title")) {
    return this.getAttribute("title");
  }
};
```
