# HTML as Custom Elements

This project aims to re-build [the elements of HTML](http://www.whatwg.org/specs/web-apps/current-work/multipage/indices.html#elements-3) as [custom elements](http://w3c.github.io/webcomponents/spec/custom/). This accomplishes two goals:

- Find missing platform APIs necessary to do the same things native HTML elements are able to do, thus producing a better [layering](http://infrequently.org/2012/11/layers-of-confusion/) story
- Validate the design of custom elements with regard to how they explain the platform as a [bedrock](http://infrequently.org/2012/04/bedrock/) API

For now, this project is largely exploratory in nature. But eventually, its code may serve as the basis for something that can be incorporated into rendering engines. (The project is led by members of the Blink team, and the Servo team has also expressed interest.)

A [demo](https://domenic.github.io/html-as-custom-elements/) is available, which shows implementation efforts for a number of fairly simple elements, and outlines the missing platform features each of them highlights. Even these simple elements have highlighted one major area of missing functionality in custom elements, which has been written up in the document ["Gap Analysis: Accessibility"](https://github.com/domenic/html-as-custom-elements/blob/master/docs/accessibility.md).

## Layering the Platform

One of the axioms of the extensible web project is that high-level, declarative APIs should be able to be explained in terms of lower-level, imperative APIs. Not just lower-level _algorithms_, but APIs: the capabilities that we encapsulate inside a given HTML element should also be exposed directly to JavaScript authors. And those APIs should be factored into small, composable pieces, that build on each other to eventually produce the declarative edifice that is HTML. In this way, authors can reuse these platform capabilities without jumping through hoops (like instantiating a `HTMLAnchorElement` just to parse a URL) or rebuilding large parts of the platform for themselves (like creating their own scrolling logic just to get pull-to-refresh behavior).

HTML as Custom Elements envisions rebuilding all of HTML using custom elements—and of course, a custom element can only be as powerful as the JavaScript behind it. So if, while rebuilding a HTML element as a custom element, we find that we cannot accomplish something the native HTML version can do, then _we have found a missing platform API_.

One of the major goals of this project is to find, enumerate, and categorize these absentee APIs. And once we've done so, we can create experimental versions in Chromium behind a flag, build a custom element over here using them to validate that they actually work, and then propose them for standardization.

## Explaining the Platform

Custom elements gives us a lot. Crucially, it gives us a story for how the parser turns tags and attributes in your HTML source into instances that exist in the JavaScript-exposed DOM. It also gives hooks into the [element lifecycle](http://w3c.github.io/webcomponents/spec/custom/#custom-element-lifecycle).

But native elements have at least one major property that custom elements do not: true encapsulation. This appears in various forms, but in general the story is that the code used to implement a HTML element (much of which currently lives in C++) cannot be interfered with or even observed by user code. For example, today changes to `window.Number` or `Element.prototype.getAttribute` will affect any custom elements coded to use those functions. Similarly, any DOM structures used to represent the "innards" of the element's on-screen representation (such as a `<video>` element's controls, or a `<input type="range">` element's slider) are exposed to the outside world. Shadow DOM provides the shape of a solution, but in its current form is very much a permeable boundary.

One longer-term goal of this project is to come up with solutions for this problem. Roughly, we are thinking about something involving [membranes](http://soft.vub.ac.be/~tvcutsem/invokedynamic/js-membranes), plus additions to shadow DOM.
