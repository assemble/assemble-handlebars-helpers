/*!
 * assemble-handlebars-helpers <https://github.com/assemble/assemble-handlebars-helpers>
 *
 * The following helpers are re-implemented based on the built-in Handlebars helpers.
 * Changes have been made for handling assemble specifics like context and errors.
 *
 * See [https://github.com/wycats/handlebars.js/tree/master/lib/handlebars/helpers] for
 * original implementation.
 *
 * Copyright (c) 2016, Brian Woodward.
 * Licensed under the MIT License.
 */

/**
 * Returns a value from an object by the property name.
 *
 * ```handlebars
 * {{lookup foo "bar"}}
 *
 * {{! as a subexpression }}
 * {{#each (lookup foo "items")}}
 *   {{this}}
 * {{/each}}
 * ```
 * @name lookup
 * @api public
 */
'use strict';

var get = require('get-value');

module.exports = function(obj, field) {
  return obj && get(obj, field);
};
