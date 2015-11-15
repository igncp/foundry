const foundryCommon = require('./common/js/common');
const router = require('./app/Router').get();

const start = function(appData) {
  router.app.data = appData;
  router.init();
};
$(document).ready(function() {
  foundryCommon.trackAnalytics();
  $.ajax('foundry.json').then(start);
});
