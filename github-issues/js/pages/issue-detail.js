define(
  [
    'app',
    'views/issue-detail'
  ],
  function(app, issueView){
    var module;

    module = {
      findModel: function(number){
        this.model = app.issues.where({ number: number })[0],
        this.view = new issueView({ model: this.model })
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