(function() {
  window.CP = {
    Models: {},
    Collections: {},
    Views: {},
    Router: {}
  };

  window.App = {
    statics: {},
    config: {},
    init: function() {
      console.log('starting');
      App.statics.router = new CP.Router();
      return Backbone.history.start();
    }
  };

  document.addEventListener("deviceready", App.init);

}).call(this);

(function() {
  CP.Router = Backbone.Router.extend({
    routes: {
      '': 'init'
    },
    'journey': 'journey',
    'status': 'status',
    init: function() {
      App.statics.current_view = new CP.Views.Init();
      return $('#backbone_main').html(App.statics.current_view.render().el);
    }
  });

}).call(this);

(function() {
  CP.Views.Init = Backbone.View.extend({
    className: 'init',
    template: window.HAML['backbone/templates/init'],
    render: function() {
      this.$el.html(this.template({}));
      return this;
    }
  });

}).call(this);
