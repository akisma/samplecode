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
        this.fetch({
          success: function(){
            app.eventHub.trigger('issues:loaded');
          },
          error: function(){
            alert('there was an error retrieving the github issues!');
          },
          reset: true
        });
      },

      url: 'https://api.github.com/repos/rails/rails/issues',
      model: issue
    });

    return issues;
  }
);