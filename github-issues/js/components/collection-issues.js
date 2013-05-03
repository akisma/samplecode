define(
  [
    'app',
    'errors',
    'backbone',
    'components/model-issue'
  ],
  function(app, errors, bb, issue){
    var issues = bb.Collection.extend({
      initialize: function(){
        $.when(this.fetch())
         .then(function(){ 
           app.eventHub.trigger('issues:loaded');
        });
      },

      url: 'https://api.github.com/repos/rails/rails/issues',
      model: issue
    });

    return issues;
  }
);