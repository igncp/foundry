const indexController = require('app/routesControllers/index');

const Router = Backbone.Router.extend({
  routes: {
    "": indexController,
  },
  goTo(fragment, options) {
    this.navigate(fragment, _.merge({
      trigger: true,
      replace: true
    }, options));
  },
  init: Backbone.history.start.bind(Backbone.history),
  getFragment: Backbone.history.getFragment.bind(Backbone.history),
});

const router = new Router();

router.app = {
  views: [],
  models: [],
  collections: [],
};
Router.get = ()=> router;
module.exports = Router;
