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

    view = bb.View.extend({
      initialize: function(){
        gV.prototype.precompileTemplates.call(this);
      },

      el: $('.js-issues-list'),

      templates: {
        item: '#template-issue-item'
      },

      render: function(){
        this.setElement($('.js-issues-list'));
        this.populateLists();
        return this.el;
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
      }
    });


    collection = bb.Collection.extend({
      url: 'https://api.github.com/repos/rails/rails/issues',
      model: issue,

      nextPage: function(){

      },

      prevPage: function(){

      }
    });

    module = {
      view: new view(),
      collection: new collection()
    };

    $.when(module.collection.fetch())
      .then(function(resp){
        module.view.render();
      });

    return module;
  }
);