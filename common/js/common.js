/* globals ga */

(function(scope) {
  var common = {};

  common.goToIndex = function() {
    location.replace('/foundry');
  };

  common.trackAnalytics = function() {
    (function(i, s, o, g, r, a, m) {
      i.GoogleAnalyticsObject = r;
      i[r] = i[r] || function() {
        (i[r].q = i[r].q || []).push(arguments);
      }, i[r].l = 1 * new Date();
      a = s.createElement(o),
        m = s.getElementsByTagName(o)[0];
      a.async = 1;
      a.src = g;
      m.parentNode.insertBefore(a, m);
    })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

    ga('create', 'UA-70138305-1', 'auto');
    ga('send', 'pageview');
  };

  if (typeof define === 'function') {
    define('foundryCommon', common);
  } else if (typeof module === 'object') {
    module.exports = common;
  } else scope.foundryCommon = common;
})(window);
