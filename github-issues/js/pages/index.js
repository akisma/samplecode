define(
  [
  	'generics/generic-page-view',
  	'components/issues-list'
  ],
  function(gpV, iL){
  	var view,
  		issuesList;

  	view = new gpV({
      templates: {
        main: "#template-index"
      },

      issuesList: issuesList
    });

    return {
      view: view,
      name: 'index'
    };
  }
);