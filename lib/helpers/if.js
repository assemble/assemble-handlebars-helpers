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
'use strict';

var utils = require('../utils');

/**
 * ```handlebars
 * {{#if foo}}
 *   {{foo}}
 * {{else}}
 *   {{bar}}
 * {{/if}}
 * ```
 * @name if
 * @api public
 */

module.exports = function _if(conditional, options) {
  var context = this._parent || this;
  if (typeof conditional === 'function') {
    conditional = conditional.call(this);
  }

  // Default behavior is to render the positive path if the value is truthy and not empty.
  // The `includeZero` option may be set to treat the condtional as purely not empty based on the
  // behavior of isEmpty. Effectively this determines if 0 is handled by the positive path or negative.
  if ((!options.hash.includeZero && !conditional) || utils.isEmpty(conditional)) {
    return options.inverse(context);
  } else {
    return options.fn(context);
  }
};
