define([
  'app',
  'backbone'
],
function(app, bb) {

  var Router = Backbone.Router.extend({
    routes: {
      '':               'index',
      'issues/:id':     'issueDetail'
    },

    loadModule: function(module){
      app.loadModule(module); 
    },

    index: function() {
      require(['pages/index'], this.loadModule);
    },

    issueDetail: function(id){
      require(['pages/issue-detail'], this.loadModule);
    }
  });

  return Router;
});
