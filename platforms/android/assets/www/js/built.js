(function() {
  if (window.HAML == null) {
    window.HAML = {};
  }

  window.HAML['backbone/templates/init'] = function(context) {
    return (function() {
      var $c, $e, $o;
      $e = function(text, escape) {
        return ("" + text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/'/g, '&#39;').replace(/\//g, '&#47;').replace(/"/g, '&quot;');
      };
      $c = function(text) {
        switch (text) {
          case null:
          case void 0:
            return '';
          case true:
          case false:
            return '' + text;
          default:
            return text;
        }
      };
      $o = [];
      $o.push("<h1>" + ($e($c("Jornada"))) + "</h1>\n<div class='btn'>" + ($e($c("Gravar"))) + "</div>");
      return $o.join("\n").replace(/\s([\w-]+)='true'/mg, ' $1').replace(/\s([\w-]+)='false'/mg, '').replace(/\s(?:id|class)=(['"])(\1)/mg, "");
    }).call(context);
  };

}).call(this);

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
