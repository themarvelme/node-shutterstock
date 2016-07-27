/**
 * Image
 */

'use strict';

/**
 * Module dependencies.
 */

var lodash = require('lodash');

var utils = require('../utils');

/**
 * Initialize a new `Image` client.
 */

function Image(api) {
  this.api = api;
}

/**
 * List collections
 */

Image.prototype.collections = function(opts, callback) {
  if (typeof opts === 'function') {
    callback = opts;
    opts = {}
  };

  var req = {
    name: 'image.collections',
    path: '/images/collections',
    query: lodash.pick('page', 'per_page')
  };


  this.api._options(req, opts);
  this.api._get(req, utils.body, callback);
};

/**
 * List collection details
 */

Image.prototype.collection = function(opts, callback) {
  if (typeof opts === 'string' || typeof opts === 'number') {
    opts = { id: String(opts) };
  };

  var req = {
    name: 'image.collection',
    path: '/images/collections/{id}',
    params: lodash.pick(opts, 'id'),
    query: lodash.pick(opts, 'embed')
  };

  this.api._options(req, opts);
  this.api._get(req, utils.body, callback);
};

/**
 * List collection content
 */

Image.prototype.collection_items = function(opts, callback) {
  if (typeof opts === 'string' || typeof opts === 'number') {
    opts = { id: String(opts) };
  };

  var req = {
    name: 'image.collection_items',
    path: '/images/collections/{id}/items',
    params: lodash.pick(opts, 'id'),
    query: lodash.pick(opts, 'embed')
  };

  this.api._options(req, opts);
  this.api._get(req, utils.body, callback);
};


/**
 * Download image
 */

Image.prototype.download = function(opts, callback) {
  if (typeof opts === 'string') {
    opts = { license_id: opts };
  };

  var req = {
    name: 'image.download',
    path: '/images/licenses/{license_id}/downloads',
    params: lodash.pick(opts, 'license_id'),
    body: lodash.pick(opts, 'request')
  };

  this.api._options(req, opts);
  this.api._post(req, utils.body, callback);
};

/**
 * License image
 */

Image.prototype.license = function(opts, callback) {
  if (!opts.subscription_id) {
    return callback(this.api._err('subscription id required', req));
  }

  if (!opts.images) {
    return callback(this.api._err('images array required', req));
  }

  var req = {
    name: 'image.license',
    path: '/images/licenses',
    query: lodash.pick(opts, 'subscription_id', 'size'),
    body: lodash.pick(opts, 'images')
  };

  this.api._options(req, opts);
  this.api._post(req, utils.body, callback);
};

/**
 * List image licenses
 */

Image.prototype.licenses = function(opts, callback) {
  if (typeof opts === 'function') {
    callback = opts;
    opts = {};
  }

  var req = {
    name: 'image.licenses',
    path: '/images/licenses',
    query: lodash.pick(opts,
      'image_id',
      'license',
      'page',
      'per_page',
      'sort'
    ),
  };

  this.api._options(req, opts);
  this.api._get(req, utils.body, callback);
};

/**
 * Get image categories
 */

Image.prototype.categories = function(opts, callback) {
  if (typeof opts === 'function') {
    callback = opts;
    opts = {};
  }

  var req = {
    name: 'image.categories',
    path: '/images/categories',
  };

  this.api._options(req, opts);
  this.api._get(req, utils.body, callback);
};

/**
 * List images
 */

Image.prototype.list = function(opts, callback) {
  if (Array.isArray(opts)) {
    opts = { id: opts };
  } else if (typeof opts === 'string' || typeof opts === 'number') {
    opts = { id: [opts] };
  }

  if (!opts.id && opts.ids) {
    opts.id = opts.ids;
    delete opts.ids;
  }

  var req = {
    name: 'image.list',
    path: '/images',
    query: lodash.pick(opts, 'id', 'view'),
  };

  if (!opts.id) {
    return callback(this.api._err('id required', req));
  }

  this.api._options(req, opts);
  this.api._get(req, utils.body, callback);
};

/**
 * Image details
 */

Image.prototype.get = function(opts, callback) {
  if (typeof opts === 'string' || typeof opts === 'number') {
    opts = { id: opts };
  }

  var req = {
    name: 'image.get',
    path: '/images/{id}',
    params: { id: opts.id },
    query: lodash.pick(opts, 'view'),
  };

  if (!opts.id) {
    return callback(this.api._err('id required', req));
  }

  this.api._options(req, opts);
  this.api._get(req, utils.body, callback);
};

/**
 * Image recommendations
 */

Image.prototype.recommendations = function(opts, callback) {
  if (Array.isArray(opts)) {
    opts = { id: opts };
  } else if (typeof opts === 'string' || typeof opts === 'number') {
    opts = { id: [opts] };
  }

  var req = {
    name: 'image.recommendations',
    path: '/images/recommendations',
    query: lodash.pick(opts,
      'id',
      'max_items',
      'safe'
    ),
  };

  this.api._options(req, opts);
  this.api._get(req, utils.body, callback);
};

/**
 * Image search
 */

Image.prototype.search = function(opts, callback) {
  if (typeof opts === 'string' || typeof opts === 'number') {
    opts = { query: opts };
  } else if (typeof opts === 'function') {
    callback = opts;
    opts = {};
  }

  var req = {
    name: 'image.search',
    path: '/images/search',
    query: lodash.pick(opts,
      'category',
      'color',
      'contributor',
      'added_date',
      'added_date_start',
      'added_date_end',
      'image_type',
      'language',
      'license',
      'model',
      'orientation',
      'page',
      'per_page',
      'people_model_released',
      'people_age',
      'people_ethnicity',
      'people_gender',
      'people_number',
      'query',
      'safe',
      'sort',
      'view'
    ),
  };

  this.api._options(req, opts);
  this.api._get(req, utils.body, callback);
};

/**
 * Similar images
 */

Image.prototype.similar = function(opts, callback) {
  if (typeof opts === 'string' || typeof opts === 'number') {
    opts = { id: [opts] };
  }

  var req = {
    name: 'image.similar',
    path: '/images/{id}/similar',
    params: { id: opts.id },
    query: lodash.pick(opts,
      'page',
      'per_page',
      'sort'
    ),
  };

  this.api._options(req, opts);
  this.api._get(req, utils.body, callback);
};

/**
 * Module exports.
 */

exports.Image = Image;
