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
    App.statics.journey= new CP.Models.Journey()
    Backbone.history.start()

document.addEventListener("deviceready", App.init)


