define([
  'app',
  'backbone'
],
function(app, bb) {

  var Router = Backbone.Router.extend({
    routes: {
      '':               'index',
      'issues/:number':     'issueDetail'
    },

    loadModule: function(module){
      app.loadModule(module); 
    },

    index: function() {
      require(['pages/index'], this.loadModule);
    },

    issueDetail: function(number){
      var router = this;

      require(['pages/issue-detail'], function(module){
        module.findModel(number);
        router.loadModule(module);
      });
    }
  });

  return Router;
});
