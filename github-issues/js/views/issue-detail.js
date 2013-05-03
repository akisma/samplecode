define(
  [
    'generics/generic-page-view'
  ],
  function(gpV){
    return gpV.extend({
      initialize: function(){
        gpV.prototype.initialize.call(this);

        this.options.model.on('error', this.errorHandler, this);
      },

      templates: {
        main: '#template-issue-detail'
      },

      render: function(){
        gpV.prototype.render.call(this);
      }
    });
  }
);