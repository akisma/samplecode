define(
  [
    'app',
    'backbone'
  ],
  function(app, bb){
    return bb.Model.extend({
      defaults: {
        number: '0',
        title: '',
        user: {
          'avatar_url': '', //gravatar
          'login': '', //username
          'url': '' //profile url
        },
        labels: [],
        state: 'open',
        body: ''
      }
    });
  }
);