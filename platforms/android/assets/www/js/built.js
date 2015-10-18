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
      $o.push("<div class='jumbotron'>\n  <h1>" + ($e($c("Calma Piloto!"))) + "</h1>\n  <p>" + ($e($c("A ideia é com o celular gravar com os sensores do celular o comportamento do onibus durante um recorrido no Rio de Janeiro. Clique nos botões para indicar o tipo de atividade que esta acontecendo para ajudar a aplicação a interpretar esses dados."))) + "</p>\n  <a class='btn btn-lg btn-primary' id='record' href='javascript:void(0);'>" + ($e($c("Iniciar Jornada"))) + "</a>\n</div>");
      return $o.join("\n").replace(/\s([\w-]+)='true'/mg, ' $1').replace(/\s([\w-]+)='false'/mg, '').replace(/\s(?:id|class)=(['"])(\1)/mg, "");
    }).call(context);
  };

}).call(this);

(function() {
  if (window.HAML == null) {
    window.HAML = {};
  }

  window.HAML['backbone/templates/journey'] = function(context) {
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
      $o.push("<div class='centered-content jumbotron'>\n  <h2>" + ($e($c(this.activity))) + "</h2>\n  <div class='mtop10 row'>\n    <button class='btn btn-warning' id='stopping'>" + ($e($c("freando"))) + "</button>\n  </div>\n  <div class='mtop10 row'>\n    <button class='btn btn-danger' id='stop'>" + ($e($c("parado"))) + "</button>\n  </div>\n  <div class='mtop10 row'>\n    <button class='btn btn-primary' id='accelerating'>" + ($e($c("acelerando"))) + "</button>\n  </div>\n  <div class='mtop10 row'>\n    <button class='btn' id='move'>" + ($e($c("em movimento"))) + "</button>\n  </div>\n</div>");
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
      App.statics.journey = new CP.Models.Journey();
      return Backbone.history.start();
    }
  };

  document.addEventListener("deviceready", App.init);

}).call(this);

(function() {
  CP.Router = Backbone.Router.extend({
    routes: {
      '': 'init',
      'journey': 'journey',
      'status': 'status'
    },
    init: function() {
      App.statics.current_view = new CP.Views.Init();
      return $('#backbone_main').html(App.statics.current_view.render().el);
    },
    journey: function() {
      App.statics.current_view = new CP.Views.Journey(App.statics.journey);
      return $('#backbone_main').html(App.statics.current_view.render().el);
    }
  });

}).call(this);

(function() {
  CP.Collections.Accelerations = Backbone.Collection.extend({
    model: CP.Models.Acceleration
  });

}).call(this);

(function() {
  CP.Collections.GeoPositions = Backbone.Collection.extend({
    model: CP.Models.GeoPosition
  });

}).call(this);

(function() {
  CP.Models.Acceleration = Backbone.Model.extend({
    defaults: {
      alpha: '',
      gama: '',
      betta: '',
      timestamp: ''
    }
  });

}).call(this);

(function() {
  CP.Models.GeoPosition = Backbone.Model.extend({
    defaults: {
      speed: '',
      latitude: '',
      longitude: '',
      timestamp: ''
    }
  });

}).call(this);

(function() {
  CP.Models.Journey = Backbone.Model.extend({
    defaults: {
      geopositions: [],
      accelerations: [],
      activity: ''
    },
    inititalize: function(args) {
      var accelerations, geopositions;
      geopositions = new CP.Collections.GeoPositions(args.get('geopositions'));
      return accelerations = new CP.Collections.Accelerations(args.get('accelerations'));
    }
  });

}).call(this);

(function() {
  CP.Router = Backbone.Router.extend({
    routes: {
      '': 'init',
      'journey': 'journey',
      'status': 'status'
    },
    init: function() {
      App.statics.current_view = new CP.Views.Init();
      return $('#backbone_main').html(App.statics.current_view.render().el);
    },
    journey: function() {
      App.statics.current_view = new CP.Views.Journey({
        model: App.statics.journey
      });
      return $('#backbone_main').html(App.statics.current_view.render().el);
    }
  });

}).call(this);

(function() {
  CP.Views.Init = Backbone.View.extend({
    className: 'init',
    template: window.HAML['backbone/templates/init'],
    events: {
      'click #record': 'create_journey'
    },
    render: function() {
      this.$el.html(this.template({}));
      return this;
    },
    create_journey: function() {
      return App.statics.router.navigate('journey', {
        trigger: true
      });
    }
  });

}).call(this);

(function() {
  CP.Views.Journey = Backbone.View.extend({
    className: 'journey',
    template: window.HAML['backbone/templates/journey'],
    initialize: function() {
      return this.listenTo(this.model, 'change', this.render);
    },
    events: {
      'click #stopping': 'update_activity',
      'click #stop': 'update_activity',
      'click #accelerating': 'update_activity',
      'click #move': 'update_activity'
    },
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },
    update_activity: function(evt) {
      return this.model.set('activity', evt.currentTarget.id);
    }
  });

}).call(this);
