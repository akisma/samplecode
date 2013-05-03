define(
  [
    'app',
    'views/issue-detail'
  ],
  function(app, issueView){
    var module;

    module = {
      findModel: function(number){
        blah = app.issues;
        module.model = app.issues.findWhere({ number: parseInt(number) });
        crap = app.issues.findWhere({ number: parseInt(number) });
        module.view = new issueView({ model: this.model });
        module.view.model = module.model;
      }
    };

    /* reevaluate this */
    app.eventHub.on('issues:loaded', function(){
      module.view.close();
      module.view.render();
    });

    return module;
  }
);