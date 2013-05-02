define(
  [
    'app',
    'backbone',
    'generics/generic-view',
    'components/collection-issues',
    'components/model-issue'
  ],
  function(app, bb, gV, cI, issue){
    var view,
        collection;

    view = new bb.View.extend({
      initialize: function(){
        gV.prototype.precompileTemplates.call(this);
      },

      templates: {
        item: '#template-issue'
      }
    });


    collection = new bb.Collection.extend({
      initialize: function(){
        this.fetch();
      },

      url: 'https://api.github.com/repos/rails/rails/issues',
      model: issue,

      nextPage: function(){

      },

      prevPage: function(){

      }
    });

    return {
      view: view,
      collection: collection
    }
  }
);