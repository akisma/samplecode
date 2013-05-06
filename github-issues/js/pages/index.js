define(
  [
    'app',
    'generics/generic-page-view',
    'components/issues-list'
  ],
  function(app, gpV, iL){
    var view,
      issuesList,
      viewClass;

    viewClass = gpV.extend({
      render: function(){
        gpV.prototype.render.call(this);

        if (app.issues.length == 0){
          app.eventHub.on('issues:loaded', function(){
            view.$el.append(view.issuesList.view.render());
          });
        } else {
          view.$el.append(view.issuesList.view.render());
        }
      }
    });

    view = new viewClass({
      templates: {
        main: "#template-index"
      }
    });

    view.issuesList = iL;

    

    return {
      view: view,
      name: 'index'
    };
  }
);