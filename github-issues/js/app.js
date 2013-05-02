define(
  [
    'jquery',
    'lodash',
    'backbone',
    'generics/generic-view',
    'generics/generic-modal'
  ],
  function($, _, bb, gV, gModal){
    var mainViewClass,
        mainView,
        app;

    mainViewClass = bb.View.extend({
      el: $('.js-main'),

      initialize: function(){
        $('html').removeClass('no-js');
        $('html').addClass('svg');
        gV.prototype.precompileTemplates.call(this);
      }
    });

    mainView = new mainViewClass();

    app = {
      activeModule: { name: '' },
      view: mainView,
      modal: new gModal(),
      eventHub: _.clone(bb.Events),
      root: '/',
      baseURL: '',

      loadModule: function(module) {
        function changeViews(){
          if(typeof app.activeModule != 'undefined'){
            if(typeof app.activeModule.view != 'undefined'){
              app.activeModule.view.close();
              //if they exist, kill subviews
              if ('subviews' in app.activeModule.view){
                $.each(app.activeModule.view.subviews, function(idx, itm){
                  itm.close();
                });
              }
            }
          }

          module.view.render();
          app.view.$el.fadeIn(150);
          app.activeModule = module;
          app.eventHub.trigger('page:rendered', module);
        }

        if(typeof(module) !== 'undefined'){ 
          if (!('activeModule' in this) || this.activeModule.name != module.name){
            if(typeof module.view == 'undefined'){
              module.init(this);
            } else if(typeof module.reload != 'undefined') {
              module.reload(this);
            }

            try { 
              
                app.view.$el.fadeOut(150, changeViews);

              
            }
            catch(e) { console.log('ERROR LOADING MODULE: ' + e.arguments[0] + ' ' + e.type); 
                      console.log('not_defined generally means there is a template error!');
                      console.log(e); } 
          }
        } else {
          throw new Error('app :: attempted to run "load module" with no module specified!');
        }
      },

      //##replaceContent
      //Append the content panel to the main app element
      replaceContent: function(content) {
        this.view.$el.empty();
        return $(content).appendTo(this.view.$el); //chaining
      },
    };

    //monitor events.
    app.eventHub.on('all', function(data){ console.log('event - ' + data); });

    return app;
  }
);