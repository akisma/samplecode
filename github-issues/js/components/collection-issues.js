define(
  [
    'app',
    'errors',
    'backbone',
    'components/model-issue'
  ],
  function(app, errors, bb, issue){
    var issues = new bb.Collection.extend({
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

    return issues;
  }
);