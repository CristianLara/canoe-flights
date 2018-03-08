/* eslint-disable */

'use strict';
var SabreDevStudioFlight = (function() {

  function SabreDevStudioFlight(options) {
    var that = this
      , SabreDevStudio = require('./sabre')
      ;
    this.sabre_dev_studio = new SabreDevStudio(options);

    /**
     * List of Air Shopping Themes
     *
     * https://developer.sabre.com/docs/read/rest_apis/travel_theme_lookup
     *
     * Example (assumes sabre_dev_studio_flight already initialized):
     * sabre_dev_studio_flight.travel_theme_lookup(callback);
     */
    this.travel_theme_lookup = function(callback) {
      var endpoint = '/v1/lists/supported/shop/themes';
      that.sabre_dev_studio.get(endpoint, {}, callback);
    };

    /**
     * Theme Airport Lookup
     *
     * https://developer.sabre.com/docs/read/rest_apis/theme_airport_lookup
     *
     * Example (assumes sabre_dev_studio_flight already initialized):
     * sabre_dev_studio_flight.theme_airport_lookup('beach', callback);
     */
    this.theme_airport_lookup = function(theme, callback) {
      var endpoint = '/v1/lists/supported/shop/themes/' + theme;
      that.sabre_dev_studio.get(endpoint, {}, callback);
    };

    /**
     * Shop for a destination (from a list of generalized destinations) given a date range
     *
     * https://developer.sabre.com/docs/read/rest_apis/destination_finder
     *
     * Note: Timezones are specific to the departure and arrival airports (but not specified).
     *
     * Example (assumes sabre_dev_studio_flight already initialized):
     * options = {
     *   origin        : 'LAS',
     *   departuredate : '2014-06-22',
     *   returndate    : '2014-06-23',
     *   theme         : 'MOUNTAINS'
     * };
     * sabre_dev_studio_flight.destination_finder(options, callback);
     */
    this.destination_finder = function(options, callback) {

      var endpoint = '/v2/shop/flights/fares';
      that.sabre_dev_studio.get(endpoint, options, callback);
    };

    /**
     * Future Dates Lead Fare Search, aka "Calendar Lead"
     *
     * https://developer.sabre.com/docs/read/rest_apis/lead_price_calendar
     *
     * Note: Timezones are specific to the departure and arrival airports (but not specified).
     *
     * Example (assumes sabre_dev_studio_flight already initialized):
     * options = {
     *   origin       : 'LAS',
     *   destination  : 'ATL',
     *   lengthofstay : 5
     * };
     * sabre_dev_studio_flight.lead_price_calendar(options, callback);
     */
    this.lead_price_calendar = function(options, callback) {
      var endpoint = '/v1/shop/flights/fares';
      that.sabre_dev_studio.get(endpoint, options, callback);
    };

    /**
     * Shop for a fare with an origin for a destination with departure and return dates
     *
     * https://developer.sabre.com/docs/read/rest_apis/instaflights_search
     *
     * Example (assumes sabre_dev_studio_flight already initialized):
     * options = {
     *   origin        : 'ATL',
     *   destination   : 'LAS',
     *   departuredate : '2014-06-22',
     *   returndate    : '2014-06-23',
     *   limit         : 10,
     *   sortby        : 'totalfare',
     *   order         : 'asc',
     *   sortby2       : 'departuretime',
     *   order2        : 'dsc'
     * };
     * sabre_dev_studio_flight.instaflights_search(options, callback);
     */
    this.instaflights_search = function(options, callback) {
      var endpoint = '/v1/shop/flights';
      that.sabre_dev_studio.get(endpoint, options, callback);
    };

    /**
     * Search for the lowest available priced itineraries based upon a travel date.
     * A wide range of user-specified criteria can be applied to the search.
     * @param request request to send as a string.
     * @param callback
     */
    this.bargain_finder_max = function (request, callback) {
      var endpoint = '/v1.8.5/shop/flights';
      var options = {
        'mode': 'live',
        'Content-Type': 'application/json'
      };
      that.sabre_dev_studio.post(endpoint, request, options, callback);
    };

    /**
     * Search for the lowest available priced itineraries based upon +/-1 or +/-3 alternate dates.
     * A wide range of user-specified criteria can be applied to the search
     * @param request request to send as a string.
     * @param callback
     */
    this.alternate_date = function (request, callback) {
      var endpoint = '/v1.8.5/shop/altdates/flights';
      var options = {
        'mode': 'live',
        'Content-Type': 'application/json'
      };
      that.sabre_dev_studio.post(endpoint, request, options, callback);
    };

    /**
     * Get up to 200 roundtrip itineraries for a specific origin, destination, and length of stay across a large set or range of travel dates.
     * https://developer.sabre.com/docs/rest_apis/air/search/advanced_calendar_search/
     * You provide search options within request text.
     * @param request request to send as a string.
     * @param callback
     */
    this.advanced_calendar_search = function(request, callback) {
      var endpoint = '/v1.8.1/shop/calendar/flights';
      var options = {
        'Content-Type': 'application/json'
      };
      that.sabre_dev_studio.post(endpoint, request, options, callback);
    };

    /**
     * Low Fare Forecast
     *
     * https://developer.sabre.com/docs/rest_apis/low_fare_forecast
     *
     * Example (assumes sabre_dev_studio_flight already initialized):
     * options = {
     *   origin        : 'ATL',
     *   destination   : 'LAS',
     *   departuredate : '2014-10-01',
     *   returndate    : '2014-10-01'
     * };
     * sabre_dev_studio_flight.low_fare_forecast(options, callback);
     */
    this.low_fare_forecast = function(options, callback) {
      var endpoint = '/v1/forecast/flights/fares';
      that.sabre_dev_studio.get(endpoint, options, callback);
    };

    /**
     * Fare Range
     *
     * https://developer.sabre.com/docs/read/rest_apis/fare_range
     *
     * Example (assumes sabre_dev_studio_flight already initialized):
     * options = {
     *   origin                : 'JFK',
     *   destination           : 'LAX',
     *   earliestdeparturedate : '2014-06-01',
     *   latestdeparturedate   : '2014-06-01',
     *   lengthofstay          : 4
     * };
     * sabre_dev_studio_flight.fare_range(options, callback);
     */
    this.fare_range = function(options, callback) {
      var endpoint = '/v1/historical/flights/fares';
      that.sabre_dev_studio.get(endpoint, options, callback);
    };

    /**
     * Travel Seasonality
     *
     * https://developer.sabre.com/docs/read/rest_apis/travel_seasonality
     *
     * Example (assumes sabre_dev_studio_flight already initialized):
     * sabre_dev_studio_flight.travel_seasonality('DFW', callback);
     */
    this.travel_seasonality = function(destination, callback) {
      var endpoint = '/v1/historical/flights/' + destination + '/seasonality';
      that.sabre_dev_studio.get(endpoint, {}, callback);
    };

    /**
     * City Pairs Lookup
     *
     * https://developer.sabre.com/docs/read/rest_apis/city_pairs_lookup
     *
     * Example (assumes sabre_dev_studio_flight already initialized):
     * options = {
     *   origincountry      : 'US',
     *   destinationcountry : 'US'
     * };
     * sabre_dev_studio_flight.city_pairs_lookup(options, callback);
     */
    this.city_pairs_lookup = function(options, callback) {
      var endpoint = '/v1/lists/airports/supported/origins-destinations';
      that.sabre_dev_studio.get(endpoint, options, callback);
    };

    /**
     * Multi-Airport City Lookup
     *
     * https://developer.sabre.com/docs/read/rest_apis/multiairport_city_lookup
     *
     * Example (assumes sabre_dev_studio_flight already initialized):
     * options = { country: 'US' };
     * sabre_dev_studio_flight.multiairport_city_lookup(options, callback);
     */
    this.multiairport_city_lookup = function(options, callback) {
      var endpoint = '/v1/lists/cities';
      that.sabre_dev_studio.get(endpoint, options, callback);
    };

    /**
     * Airports At Cities Lookup
     *
     * https://developer.sabre.com/docs/read/rest_apis/airports_at_cities_lookup
     *
     * Example (assumes sabre_dev_studio_flight already initialized):
     * options = { city: 'NYC' };
     * sabre_dev_studio_flight.airports_at_cities_lookup(options, callback);
     */
    this.airports_at_cities_lookup = function(options, callback) {
      var endpoint = '/v1/lists/airports';
      that.sabre_dev_studio.get(endpoint, options, callback);
    };
  }
  return SabreDevStudioFlight;
})();

module.exports = SabreDevStudioFlight;