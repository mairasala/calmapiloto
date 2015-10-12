CP.Views.Init = Backbone.View.extend
  className:'init'
  render:->
    @$el.html(this.template())
    @
    
  template:->
    "<h1>grabador de jornada</h1>"