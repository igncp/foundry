const router = require('./router');
const directives = require('./directives');

const app = angular.module('app', ['ui.router']);

directives.registerDirectives(app);
router.configure(app);
