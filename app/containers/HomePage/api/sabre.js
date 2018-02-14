/* eslint-disable */

/*
 * sabre-dev-studio
 * https://github.com/SabreLabs/sabre-dev-studio-node
 *
 * Copyright (c) 2014 Sabre Corp
 * Licensed under the MIT license.
 */

'use strict';
var SabreDevStudio = (function() {
  require('simple-errors');
  function SabreDevStudio(options) {
    var that = this
      , loglevel = options.loglevel || 'warn'
      , request = require('request')
      , oauth2Factory = require('simple-oauth2')
      , bunyan = require('bunyan')
      , oauth2 = null
      , log = bunyan.createLogger({name: 'SabreDevStudio', level: loglevel})
      , errorCodes = {
        400: 'BadRequest',
        401: 'Unauthorized',
        403: 'Forbidden',
        404: 'NotFound',
        406: 'NotAcceptable',
        429: 'RateLimited',
        500: 'InternalServerError',
        503: 'ServiceUnavailable',
        504: 'GatewayTimeout'
      }
      ;
    delete options.loglevel;
    this.config = {
      gzip: true
    };
    init(options);
    function init(options) {
      var clientID = function() {
        return new Buffer(that.config.client_id).toString('base64');
      };
      var clientSecret = function() {
        return new Buffer(that.config.client_secret).toString('base64');
      };

      var keys = ['client_id', 'client_secret', 'uri', 'access_token'];
      keys.forEach(function(key) {
        that.config[key] = options[key];
      });

      oauth2 = oauth2Factory({
        clientID: clientID(),
        clientSecret: clientSecret(),
        site: options.uri,
        tokenPath: '/v2/auth/token',
        useBasicAuthorizationHeader: true
      });
    }

    this.get = function(endpoint, options, callback, retryCount) {
      this.request("GET", endpoint, "", options, callback, retryCount);
    };

    this.post = function(endpoint, post_body, options, callback, retryCount) {
      this.request("POST", endpoint, post_body, options, callback, retryCount);
    };

    this.request = function(method, endpoint, post_body, options, callback, retryCount) {
      if (typeof retryCount === 'undefined') {
        retryCount = 1; // by default one retry
      }
      var headers = {};
      for( var key in options) {
        headers[key]= options[key];
      }
      options = options || {};
      var cb = callback || function(error, response, data) { log.info(error, data); };
      var fetchAccessToken = function(endpoint, options, cb, retryCount) {
        log.info('Fetching fresh access token');
        oauth2.client.getToken({}, function (error, token) {
          if (error) {
            var err = Error.http(error.statusCode, errorCodes[error.statusCode], error.data, error);
            log.error('Error:', err);
            cb(err);
          } else {
            that.config.access_token = token.access_token;
            that.request(method, endpoint, post_body, options, cb, retryCount);
          }
        });
      };
      if (that.config.access_token) {
        var requestUrl = that.config.uri + endpoint
          , reqestOptions = {
          gzip: that.config.gzip,
          qs: options,
          method: method,
          body: post_body,
          auth: {
            "bearer": this.config.access_token
          }
        };
        request[method.toLowerCase()](requestUrl, reqestOptions, function(error, response, data) {
          if (error) {
            if (error.data === '') { error.data = requestUrl; }
            log.error('Error:', error);
            cb(error, data, response);
          } else if (response.statusCode === 200) {
            cb(null, data, response);
          } else if (response.statusCode === 401 && retryCount >= 0) {
            fetchAccessToken(endpoint, options, cb, --retryCount);
          } else if (errorCodes[response.statusCode]) {
            var err = Error.http(response.statusCode, errorCodes[response.statusCode]);
            cb(err, data, response);
          }
        });
      } else {
        if (retryCount >= 0) {
          fetchAccessToken(endpoint, options, cb, --retryCount);
        }
      }
    };
  }

  return SabreDevStudio;
})();

module.exports = SabreDevStudio;