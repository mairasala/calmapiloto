window.CP=
  Models: {},
  Collections: {}
  Views: {}
  Router: {}
window.App=
  statics: {}
  config: {}
  init:->
    console.log('starting')
    App.statics.router=new CP.Router()
    Backbone.history.start()

document.addEventListener("deviceready", App.init)


