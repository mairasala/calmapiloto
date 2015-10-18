CP.Views.Init = Backbone.View.extend
  className:'init'
  template: window.HAML['backbone/templates/init']

  events:
    'click #record': 'create_journey'

  render:->
    @$el.html(this.template({}))
    @

  create_journey:->
    App.statics.router.navigate('journey', trigger:true)