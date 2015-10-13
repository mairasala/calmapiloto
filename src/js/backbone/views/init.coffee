CP.Views.Init = Backbone.View.extend
  className:'init'
  template: window.HAML['backbone/templates/init']
  render:->
    @$el.html(this.template({}))
    @