define(
  [
  	'generics/generic-page-view'
  ],
  function(gpV){
  	var view = new gpV({
      templates: {
        main: "#template-index"
      }
    });

    return {
      view: view,
      name: 'index'
    };
  }
);