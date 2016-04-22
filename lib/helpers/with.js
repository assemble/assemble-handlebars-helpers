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

module.exports = function(context, options) {
  if (typeof context === 'function') {
    context = context.call(this);
  }

  var fn = options.fn;

  if (!utils.isEmpty(context)) {
    var data = options.data;
    if (options.data && options.ids) {
      data = utils.createFrame(options.data);
      data.contextPath = utils.appendContextPath(options.data.contextPath, options.ids[0]);
    }

    return fn(context, {
      data: data,
      blockParams: utils.blockParams([context], [data && data.contextPath])
    });
  } else {
    return options.inverse(this.context);
  }
};
