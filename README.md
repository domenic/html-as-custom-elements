#HTML as Custom Elements
tl;dr: [Custom Elements](http://w3c.github.io/webcomponents/spec/custom/) is a [bedrock](http://infrequently.org/2012/04/bedrock/) API. We should be able to build all [HTML elements](http://www.whatwg.org/specs/web-apps/current-work/multipage/semantics.html#semantics) with it.
##Runtime Environment
It's clear that we're running some sort of code in some special way. Handwaving, we suppose that we have a runtime environment that possesses the following qualities:

1. There is a strong security boundary between user agent code and author code (writing UA code in C++ is today's solution)
2. There is a set of lower-level APIs the user agent code needs to implement HTML elements

Digging into how each element is built, let's try to keep track of these lower-level APIs. Look for a special **Bedrock** section.
##Additional Callbacks
To implement HTML elements effectively, Custom Elements may need an additional callbacks, like ```childrenChanged```, which is enqueued whenever the list of element's children changes. We should start with using mutation observers and see how far we get.

##Callback Barriers
In the current Custom Elements spec, there's a neat queues-based abstraction that ensures callbacks are invoked consistently and--more importantly--safely. This is accomplished by queueing the callbacks in carefully prescribed order, and then invoking them when we deem it safe.

If you squint and look at it just so, this abstraction looks like a key part of that security boundary I mentioned earlier: it's only necessary to employ for those custom elements whose callbacks we don't trust to always do right thing.

This means that we may have to turn this abstraction into an API that the platform can skip for HTML elements (thus making their callbacks truly synchronous) and use for the author-created ones.

##Who's on First?
There is a notion of a [browsing context](http://www.whatwg.org/specs/web-apps/current-work/multipage/browsers.html#browsing-context) in the HTML spec. It seems like a good candidate for a bedrock API, which should have some pluggable way to initialize Documents. For HTML Documents, this initialization will involve [registering](http://w3c.github.io/webcomponents/spec/custom/#dfn-element-registration) all HTML elements before instantiating an [HTML Parser](http://www.whatwg.org/specs/web-apps/current-work/multipage/parsing.html#html-parser).

**Bedrock**:
* Browsing context
* HTML Parser

##What's pre-fetching?
Traditionally, rendering engines were able to optimize their performance by looking ahead of the parser, picking out elements that fetch resources, and starting to fetch those resources early. Currently, this is something that's just hard-wired, but it seems valuable to have a more flexible way to inform pre-fetching machinery about attribute values of custom elements that represent resource.

**Bedrock**:
* Pre-fetch API.

##The ```<script>``` Element
The ```<script>``` element relies on synchronous callbacks to [prepare](http://www.whatwg.org/specs/web-apps/current-work/multipage/scripting-1.html#prepare-a-script) a script. It will need a few APIs to do its work:

**Bedrock**:
* [Do a potentially CORS-enabled fetch](http://www.whatwg.org/specs/web-apps/current-work/multipage/fetching-resources.html#potentially-cors-enabled-fetch) of a resource
* [Create and execute a script](http://www.whatwg.org/specs/web-apps/current-work/multipage/webappapis.html#create-a-script)
* Some sort of task scheduling/prioritization API
* Probably missed something, ```<script>``` is a wrinkly beast.

##The ```<link>``` Element
The ```<link>``` element is fairly straightforward. The [attributeChanged](http://w3c.github.io/webcomponents/spec/custom/#types-of-callbacks), [enteredView](http://w3c.github.io/webcomponents/spec/custom/#types-of-callbacks), and [leftView](http://w3c.github.io/webcomponents/spec/custom/#types-of-callbacks) provide all the necessary hooks.

**Bedrock**:
* Some [origin](http://www.whatwg.org/specs/web-apps/current-work/multipage/origin-0.html#origin) API and  [Policy](https://dvcs.w3.org/hg/content-security-policy/raw-file/tip/csp-specification.dev.html) to help deciding how/whether to load resources
* [Do a potentially CORS-enabled fetch](http://www.whatwg.org/specs/web-apps/current-work/multipage/fetching-resources.html#potentially-cors-enabled-fetch) of a resource
* Some sort of task scheduling/prioritization API
* Parse CSS text into a stylesheet
* Add stylesheet to the Style engine
* Evaluate [media query](http://w3c-test.org/csswg/mediaqueries3/)
* [Create and execute a script](http://www.whatwg.org/specs/web-apps/current-work/multipage/webappapis.html#create-a-script) for HTML Imports

##The ```<style>``` Element
The ```<style>``` element needs the **childrenChanged** callback and uses [attributeChanged](http://w3c.github.io/webcomponents/spec/custom/#types-of-callbacks), [enteredView](http://w3c.github.io/webcomponents/spec/custom/#types-of-callbacks), and [leftView](http://w3c.github.io/webcomponents/spec/custom/#types-of-callbacks) callbacks.

**Bedrock**:
* Parse CSS text into a stylesheet
* Add stylesheet to the style engine

##The ```<img>```, ```<video>```, and ```<audio>``` Elements
Implementation of these elements is fairly trivial in terms of Custom Elements, but they invoke a few bedrock APIs.

**Bedrock**:
* Some [origin](http://www.whatwg.org/specs/web-apps/current-work/multipage/origin-0.html#origin) API and [Policy](https://dvcs.w3.org/hg/content-security-policy/raw-file/tip/csp-specification.dev.html) to help deciding how/whether to load resources
* [Do a potentially CORS-enabled fetch](http://www.whatwg.org/specs/web-apps/current-work/multipage/fetching-resources.html#potentially-cors-enabled-fetch) of a resource
* Some sort of task scheduling/prioritization API
* A surface primitive, which renders pixels and knows how to size itself relative to the dimensions of the element (likely a style engine primitive)
* Video engine that ships pixels for each frame to the surface primitive
* Audio engine

##The ```<iframe>```, ```<object>```, and ```<canvas>``` Elements
The Custom Element scaffolding is trivial for these elements.

**Bedrock**:
* A surface primitive, which renders pixels and knows how to size itself relative to the dimensions of the element (likely a style engine primitive)
* Some sort of streaming/buffering info API to inform UI.
* A view into a browsing context primitive for an iframe?
* Some way to instantiate an NPAPI/PPAPI object and ship pixels from it to the surface primitive

##The ```<input type="file">``` Element
**Bedrock**:
* Access to file system
* Privileged events to open file picker?

##Et al.
The rest of the elements either require no additional behavior or are trivially implementable using Custom Element callbacks.

*TODO*: Keep refining elements and looking for special APIs.

##Where's Bedrock?
Based on this exploration, the following bits of flintstone have emerged:

**Browsing Context**
 * Instantiates new documents in response to navigation requests
 * Holds documents in a history
 * Provides a way to create a View

**View**
* A view is a thing that builds a box tree and turns it into pixels.
 * *TODO*: how to decouple this from DOM?

**HTML Parser**

**Script Runner**
* Create and execute a script 

**Resource Fetcher**
* Do a potentially CORS-enabled fetch of a resource
* Pre-fetch API.

**Event Loop**
* Some sort of task scheduling/prioritization API
* Some origin API and Policy to help deciding how/whether to load resources

**CSS Parser**
* Parse CSS text into a stylesheet

**Style Engine**
* Add stylesheet to a styleengine

**Media Query Engine**
* Evaluate media query

**Rendering Surface**
* Renders pixels and knows how to size itself relative to the dimensions of the element (likely a style engine primitive)

**Video Player**
* Ships pixels for each frame to the surface primitive
* Some sort of streaming/buffering info API to inform UI.

**Audio Player**

