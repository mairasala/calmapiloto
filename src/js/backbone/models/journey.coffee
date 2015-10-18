CP.Models.Journey = Backbone.Model.extend
  defaults:
    geopositions: []
    accelerations: []
    activity: ''

  inititalize:(args)->
    geopositions = new CP.Collections.GeoPositions(args.get('geopositions'))
    accelerations = new CP.Collections.Accelerations(args.get('accelerations'))

