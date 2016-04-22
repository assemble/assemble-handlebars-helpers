'use strict';

var utils = {};

utils.createFrame = require('create-frame');

/**
 * blockParams method from internal Handlebars utils
 */

utils.blockParams = function(params, ids) {
  params.path = ids;
  return params;
};

/**
 * appendContextPath method from internal Handlebars utils
 */

utils.appendContextPath = function(contextPath, id) {
  return (contextPath ? contextPath + '.' : '') + id;
};

utils.isEmpty = function(val) {
  if (!val && val !== 0) {
    return true;
  }

  if (Array.isArray(val) && !val.length) {
    return true;
  }

  return false;
};

module.exports = utils;
