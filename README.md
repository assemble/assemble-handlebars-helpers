# assemble-handlebars-helpers [![NPM version](https://img.shields.io/npm/v/assemble-handlebars-helpers.svg?style=flat)](https://www.npmjs.com/package/assemble-handlebars-helpers) [![NPM downloads](https://img.shields.io/npm/dm/assemble-handlebars-helpers.svg?style=flat)](https://npmjs.org/package/assemble-handlebars-helpers) [![Build Status](https://img.shields.io/travis/assemble/assemble-handlebars-helpers.svg?style=flat)](https://travis-ci.org/assemble/assemble-handlebars-helpers)

> Default helpers for use in assemble to replace the built-in Handlebars helpers.

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install assemble-handlebars-helpers --save
```

## Usage

> Register the helpers with an assemble instance called `app`.

```js
var assemble = require('assemble');
var app = assemble();
app.helpers(require('assemble-handlebars-helpers'));
```

## Helpers

### [each](lib/helpers/each.js#L26)

Iterate over an array or object's key/value pairs.

**Example**

```handlebars
{{#each arr}}
  {{this}}
{{/each}}
```

### [if](lib/helpers/if.js#L26)

**Example**

```handlebars
{{#if foo}}
  {{foo}}
{{else}}
  {{bar}}
{{/if}}
```

### [log](lib/helpers/log.js#L23)

**Example**

```handlebars
{{log foo}}
```

### [lookup](lib/helpers/lookup.js#L29)

Returns a value from an object by the property name.

**Example**

```handlebars
{{lookup foo "bar"}}

{{! as a subexpression }}
{{#each (lookup foo "items")}}
  {{this}}
{{/each}}
```

### [unless](lib/helpers/unless.js#L26)

**Example**

```handlebars
{{#unless foo}}
  {{foo}}
{{else}}
  {{bar}}
{{/unless}}
```

### [with](lib/helpers/with.js#L24)

**Example**

```handlebars
{{#with foo}}
  {{bar}}
{{/with}}
```

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/assemble/assemble-handlebars-helpers/issues/new).

## Building docs

Generate readme and API documentation with [verb](https://github.com/verbose/verb):

```sh
$ npm install verb && npm run docs
```

Or, if [verb](https://github.com/verbose/verb) is installed globally:

```sh
$ verb
```

## Running tests

Install dev dependencies:

```sh
$ npm install -d && npm test
```

## Author

**Brian Woodward**

* [github/doowb](https://github.com/doowb)
* [twitter/doowb](http://twitter.com/doowb)

## License

Copyright © 2016, [Brian Woodward](https://github.com/doowb).
Released under the [MIT license](https://github.com/assemble/assemble-handlebars-helpers/blob/master/LICENSE).

***

_This file was generated by [verb](https://github.com/verbose/verb), v0.9.0, on April 24, 2016._