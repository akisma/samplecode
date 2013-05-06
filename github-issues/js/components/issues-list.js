define(
  [
    'app',
    'backbone',
    'generics/generic-view'
  ],
  function(app, bb, gV){
    var view,
        collection;

    view = bb.View.extend({
      initialize: function(){
        gV.prototype.precompileTemplates.call(this);
      },

      templates: {
        item: '#template-issue-item'
      },

      render: function(){
        this.populateLists();
        return this.el;
      },

      events: {

      },

      //##populateList
      //take inventory data from the collection and make a list
      populateLists: function(){
        var issues = module.collection.toJSON(),
            view = this;

        $.each(issues, function(idx, itm){
          view.$el.append(view.templates.item(itm));
        });

        return view.$el;
      },

      nextPage: function(){

      },

      prevPage: function(){

      }
    });

    module = {
      view: new view(),
      collection: app.issues
    };

    return module;
  }
);