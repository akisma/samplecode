define(
  [
    'app',
    'components/collection-issues'
  ],
  function(app, issues){
    var model = new oM(),
        module;

    module = {
      model: model,
      view: new oV({ model: model })
    };

    /* reevaluate this */
    $.when(issues.fetch())
      .then(function(){
        module.model.fetch();
        module.view.close();
        module.view.render();
      });

    return module;
  }
);