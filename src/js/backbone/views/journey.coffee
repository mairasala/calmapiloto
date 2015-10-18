CP.Views.Journey = Backbone.View.extend
  className:'journey'
  template: window.HAML['backbone/templates/journey']

  initialize:->
    @listenTo @model, 'change', @render

  events:
    'click #stopping':     'update_activity'
    'click #stop':         'update_activity'
    'click #accelerating': 'update_activity'
    'click #moving':         'update_activity'
  
  render:->
    @$el.html(this.template(@model.toJSON()))
    @

  update_activity:(evt)->
    @model.set 'activity', evt.currentTarget.id
