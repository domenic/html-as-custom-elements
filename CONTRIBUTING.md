# Contributing to HTML as Custom Elements

## How Can You Help?

There are two main ways you can contribute:

1. Contribute to the mainstream development effort! For this, see the roadmap in our readme. In particular, we need help with infrastructure and hard problems more urgently than we need to check off every element in HTML.
2. Help us find and categorize absentee APIs! What capabilities do native HTML elements get that we don't? File an issue to discuss it, or help us organize those issues into a coherent wiki page.

## Developing

First, get set up. Ensure you have Chrome Canary installed, then run

```bash
$ npm install
```

Then, you can run the tests via either

```bash
$ npm test
```

for a single run, or

```bash
$ npm watch
```

for continuous development. In both cases, a Chrome Canary tab will pop open, and report the results back to your console.
