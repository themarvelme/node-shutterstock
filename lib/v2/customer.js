/**
 * Customer
 */

'use strict';

/**
 * Module dependencies.
 */

var lodash = require('lodash');

var utils = require('../utils');

/**
 * Initialize a new `Customer` client.
 */

function Customer(api) {
  this.api = api;
}

/**
 * List subscriptions
 */

Customer.prototype.subscriptions= function(opts, callback) {
  if (typeof opts === 'function') {
    callback = opts;
    opts = {}
  };

  var req = {
    name: 'customer.subscriptions',
    path: '/user/subscriptions',
  };

  this.api._options(req, opts);
  this.api._get(req, utils.body, callback);
};

/**
 * Module exports.
 */

exports.Customer = Customer;
