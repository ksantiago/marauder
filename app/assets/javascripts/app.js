var app = app || {};

app.createUser = function(e) {
  // when you click on submit, you want to prevent from changing URL
  e.preventDefault();
  // pulling out the input values from the form
  var name = $("form").find("input[name='name']").val();
  var email = $("form").find("input[name='email']").val();
  var userLat = app.lat;
  var userLng = app.lng;


  // this is the params that will go into the ajax
  var userParams = {
    user: {
      name: name,
      email: email,
      lat: app.Lat,
      lng: app.Lng
  }
};

  // ajax request to add data userParams into the data
  $.ajax({
    type: "POST",
    url: "users.json",
    data: userParams
  }).done(function(user) {
    // do something with the response
    app.user = user;
    console.log('got back this response');
    console.log(user);
    app.updateLocation();
  });
};

app.displayUser = function(user) {
  var name = user.name;
  $("#notice").text(name);
  $("#notice").fadeOut(1000);
};

app.makeMap = function() {
  var mapOptions = {
    // this takes your current position - as def in ready fn and drops into the center of the map
    center: new google.maps.LatLng(app.lat, app.lng),
    zoom: 12,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: [{featureType:'road',elementType:'geometry',stylers:[{'visibility':'simplified'}]},{featureType:'road.arterial',stylers:[{hue:149},{saturation:-78},{lightness:0}]},{featureType:'road.highway',stylers:[{hue:-31},{saturation:-40},{lightness:2.8}]},{featureType:'poi',elementType:'label',stylers:[{'visibility':'off'}]},{featureType:'landscape',stylers:[{hue:163},{saturation:-26},{lightness:-1.1}]},{featureType:'transit',stylers:[{'visibility':'off'}]},{featureType:'water',stylers:[{hue:3},{saturation:-24.24},{lightness:-38.57}]}]

    // styles: style_array_from_above_here
  };

  map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
};

app.addPin = function() {
  // this takes your current position (as defined in the ready function and drops into the variable)
  var myLatlng = new google.maps.LatLng(app.lat, app.lng);

  var marker = new google.maps.Marker({
    position: myLatlng,
    title:"Hello World!"
  });

  marker.setMap(map);
};

app.updateLocation = function() {

  // continuously checks your position and calls the function
  // watchPosition is an evenlistener on geoloc so whenever user moves, it triggers and calls success function
  navigator.geolocation.watchPosition(function(position){
    console.log(position);
    app.userLat = position.coords.latitude;
    app.userLng = position.coords.longitude;

  // this is the params that will go into the ajax
  var userParams = {
    user: {
      lat: app.userLat,
      lng: app.userLng
    }
  };

  var updateUserUrl = "users/" + app.user.id;
  debugger;
    $.ajax({
      dataType: "json",
      type: "PUT",
      url: updateUserUrl,
      data: userParams
    }).done(function(data){
      console.log(data);
    });
  });

};



// document ready
$(document).ready(function() {

  // this tells your browser to look up your current geolocation and grab those coords
  // then creats map when it knows your geolocation
  navigator.geolocation.getCurrentPosition(function(position){
    app.lat = position.coords.latitude;
    app.lng = position.coords.longitude;
    app.makeMap();
  });


  // when you click on the submit button, it triggers the app.createUser
  $(".submit").on("click", app.createUser);

  // eventlistener when drop pin button is clicked
  $("#drop-pin").on("click", app.addPin);

});

