define(
  [
    'app',
    'views/issue-detail'
  ],
  function(app, issueView){
    var module;

    module = {
      findModel: function(number){
        module.model = app.issues.findWhere({ number: parseInt(number) });
        module.view = new issueView({ model: this.model });
        module.view.model = module.model;
      }
    };

    app.eventHub.on('issues:loaded', function(){
      module.view.close();
      module.view.render();
    });

    return module;
  }
);