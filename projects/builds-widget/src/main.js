require('./main.scss');

angular.module('app', ['ui.router']);

require('./constants')();
require('./directives')();
require('./services')();
require('./router')();