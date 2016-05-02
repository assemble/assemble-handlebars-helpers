'use strict';

var capture = require('capture-stream');
var assemble = require('assemble');
var assert = require('assert');
var helpers = require('./');
var app;

describe('assemble-handlebars-helpers', function() {
  beforeEach(function() {
    app = assemble();
    app.helpers(helpers);
  });

  it('should register helpers', function() {
    assert.deepEqual(Object.keys(app._.helpers.sync), ['each', 'if', 'log', 'lookup', 'unless', 'with']);
  });

  describe('each', function() {
    it('should render using {{each}} helper', function(cb) {
      app.page('a.hbs', { content: '{{#each items}}{{this}}{{/each}}' });
      var context = {
        items: ['a', 'b', 'c']
      };
      app.render('a.hbs', context, function(err, results) {
        if (err) return cb(err);
        assert.equal(results.content, 'abc');
        cb();
      });
    });

    it('should render using {{if}} helper inside {{each}} helper without context loss', function(cb) {
      app.page('a.hbs', { content: '{{#each items}}{{#if foo}}{{foo}}{{/if}}{{/each}}' });
      var context = {
        items: [{foo: 'a'}, {foo: false}, {foo: 'c'}]
      };
      app.render('a.hbs', context, function(err, results) {
        if (err) return cb(err);
        assert.equal(results.content, 'ac');
        cb();
      });
    });
  });

  describe('if', function() {
    it('should render using {{if}} helper', function(cb) {
      app.page('a.hbs', { content: '{{#if foo}}{{foo}}{{/if}}' });
      var context = {
        foo: 'bar'
      };
      app.render('a.hbs', context, function(err, results) {
        if (err) return cb(err);
        assert.equal(results.content, 'bar');
        cb();
      });
    });
  });

  describe('log', function() {
    it('should render using {{log}} helper', function(cb) {
      app.page('a.hbs', { content: '{{log items}}' });
      var context = {
        items: ['a', 'b', 'c']
      };

      var restore = capture(process.stdout);
      app.render('a.hbs', context, function(err, results) {
        var output = restore(true);
        if (err) return cb(err);
        assert.equal(results.content, '');
        assert.equal(output.indexOf("[ 'a', 'b', 'c' ]"), 0);
        cb();
      });
    });
  });

  describe('lookup', function() {
    it('should render using {{lookup}} helper', function(cb) {
      app.page('a.hbs', { content: '{{#each (lookup data "items")}}{{this}}{{/each}}' });
      var context = {
        data: { items: ['a', 'b', 'c'] }
      };
      app.render('a.hbs', context, function(err, results) {
        if (err) return cb(err);
        assert.equal(results.content, 'abc');
        cb();
      });
    });
  });

  describe('unless', function() {
    it('should render using {{unless}} helper', function(cb) {
      app.page('a.hbs', { content: '{{#unless foo}}{{bar}}{{/unless}}' });
      var context = {
        foo: false,
        bar: 'baz'
      };
      app.render('a.hbs', context, function(err, results) {
        if (err) return cb(err);
        assert.equal(results.content, 'baz');
        cb();
      });
    });
  });

  describe('with', function() {
    it('should render using {{with}} helper', function(cb) {
      app.page('a.hbs', { content: '{{#with data}}{{#each items}}{{this}}{{/each}}{{/with}}' });
      var context = {
        data: { items: ['a', 'b', 'c'] }
      };
      app.render('a.hbs', context, function(err, results) {
        if (err) return cb(err);
        assert.equal(results.content, 'abc');
        cb();
      });
    });
  });
});
