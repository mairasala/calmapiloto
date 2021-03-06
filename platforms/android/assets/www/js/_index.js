requirejs(["cp_router"])
requirejs(["views/init"])
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        $('#start').on('touchend',function(evt){
            $("#stop").toggleClass('invisible',false);
            $("#start").toggleClass('invisible',true);
            options={ maximumAge: 3000, timeout: 5000, enableHighAccuracy: true };
            // app.watchId = navigator.geolocation.watchPosition(app.geolocationSuccess,app.geolocationError,options);
            app.walked_distance=0;
            $('.geolocation').html('');
            console.log('onDeviceReady');
            if (window.DeviceOrientationEvent){
               window.addEventListener("devicemotion", app.orientationChange, true);
            }else{
            console.log('orientation not supported')
        }
           
        });
        $('#stop').on('touchend',function(evt){
            $("#stop").toggleClass('invisible',true);
            $("#start").toggleClass('invisible',false);
            if(app.first_position){
                $('.geolocation').append("origin:<br/> latitude: "+app.first_position.coords.latitude+"<br /> longitudes: "+app.first_position.coords.longitude)
            }
            window.removeEventListener("devicemotion", app.orientationChange);
            $('.speed').html('-')
            navigator.geolocation.clearWatch(app.watchId);
            app.first_position=app.last_position=null;
            
        });
    },

    orientationChange:function(eventData){
        // console.log('orientation')
        // navigator.accelerometer.getCurrentAcceleration(app.accelerometerSuccess, app.accelerometerError);

        var acceleration = eventData.acceleration;
        var rotation = eventData.rotationRate;

        var acc= Math.sqrt(Math.pow(acceleration.x,2)+Math.pow(acceleration.y,2)+Math.pow(acceleration.z,2));
       

        var cleanAcc=(Math.round(acc*100)/100)

        if(cleanAcc>0.2){
         console.log(acc);

        var info, xyz = "data :[X, Y, Z]"
        
        info= xyz.replace('data', 'acceleration');
        info = info.replace("X", acceleration.x);
        info = info.replace("Y", acceleration.y);
        info = info.replace("Z", acceleration.z);
        console.log(info);

          
        info= xyz.replace('rotation', 'acceleration');
        info = info.replace("X", rotation.alpha);
        info = info.replace("Y", rotation.beta);
        info = info.replace("Z", rotation.gamma);
        console.log(info);


        
        }else{
            cleanAcc=0;
        }
        $('.speed').html(cleanAcc+" m/s2")
       
    },

    accelerometerSuccess: function(aceleration){
        console.log('aceleration:');
        console.log(aceleration);
    },

    accelerometerError: function(acelerationError){
        console.log(acelerationError);
    },

    geolocationSuccess: function(position){
        if(!app.last_position || position.coords.latitude != app.last_position.coords.latitude || position.coords.longitude != app.last_position.coords.longitude){
             var distance1=app.last_position ? app.calulate_distance(position.coords,app.last_position.coords): 0;
             var distance2 = app.first_position ? app.calulate_distance(position.coords,app.first_position.coords): 0;
             var distance= "Last movement: "+distance1+"m | from origin: "+distance2+ "m | walked: "+app.walked_distance+" m";
             if (distance1 >0){
                $('.geolocation').html('Latitude: '  + position.coords.latitude      + '<br />' +
                            'Longitude: ' + position.coords.longitude     + '<br />' + distance+
                            '<hr />');
             }
        if (position.coords.speed!= null){
            $('.speed').html(position.coords.speed+" m/s")
        }
        $('.geolocation').animate({opacity:0.3},200).delay(200).animate({opacity:1},200)
        
        if(app.first_position==null){
            app.first_position=position;
        }
        app.last_position=position;
        app.walked_distance+=distance1;
        } 
    },
    calulate_distance:function(coord1,coord2)
    {

        var R = 6378.137; // Radius of earth in KM
        var dLat = (coord2.latitude - coord1.latitude) * Math.PI / 180;
        var dLon = (coord2.longitude - coord1.longitude) * Math.PI / 180;
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(coord1.latitude * Math.PI / 180) * Math.cos(coord2.latitude  * Math.PI / 180) *
        Math.sin(dLon/2) * Math.sin(dLon/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c;
        return (parseInt(d * 100000)/100); // meters
    },
    geolocationError:function(error){
        $('.speed').html(error.message)
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        // app.receivedEvent('deviceready');
        $("#start").toggleClass('invisible',false);
        
    },
    // Update DOM on a Received Event
   
};

app.initialize();