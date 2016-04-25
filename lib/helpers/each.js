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
 * Iterate over an array or object's key/value pairs.
 *
 * ```handlebars
 * {{#each arr}}
 *   {{this}}
 * {{/each}}
 * ```
 * @name each
 * @api public
 */

module.exports = function each(context, options) {
  if (!options) {
    throw new Error('Must pass iterator to #each');
  }

  var fn = options.fn;
  var inverse = options.inverse;

  var i = 0;
  var ret = '';
  var data;
  var contextPath;

  if (options.data && options.ids) {
    contextPath = utils.appendContextPath(options.data.contextPath, options.ids[0]) + '.';
  }

  if (typeof context === 'function') {
    context = context.call(this);
  }

  if (options.data) {
    data = utils.createFrame(options.data);
  }

  function execIteration(field, index, last) {
    if (data) {
      data.key = field;
      data.index = index;
      data.first = index === 0;
      data.last = !!last;

      if (contextPath) {
        data.contextPath = contextPath + field;
      }
    }

    ret = ret + fn(context[field], {
      data: data,
      blockParams: utils.blockParams([context[field], field], [contextPath + field, null])
    });
  }

  if (context && typeof context === 'object') {
    if (Array.isArray(context)) {
      for (var j = context.length; i < j; i++) {
        if (i in context) {
          execIteration(i, i, i === context.length - 1);
        }
      }
    } else {
      var priorKey;

      for (var key in context) {
        if (context.hasOwnProperty(key)) {
          // We're running the iterations one step out of sync so we can detect
          // the last iteration without have to scan the object twice and create
          // an itermediate keys array.
          if (priorKey !== undefined) {
            execIteration(priorKey, i - 1);
          }
          priorKey = key;
          i++;
        }
      }
      if (priorKey !== undefined) {
        execIteration(priorKey, i - 1, true);
      }
    }
  }

  if (i === 0) {
    ret = inverse(this);
  }

  return ret;
};
