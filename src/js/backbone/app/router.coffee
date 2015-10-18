CP.Router = Backbone.Router.extend
  routes:
    ''             : 'init'
    'journey'       : 'journey'
    'status'        : 'status'

  init:->
    App.statics.current_view = new CP.Views.Init()
    $('#backbone_main').html(App.statics.current_view.render().el)

  journey:->
    App.statics.current_view = new CP.Views.Journey(App.statics.journey)
    $('#backbone_main').html(App.statics.current_view.render().el)
  