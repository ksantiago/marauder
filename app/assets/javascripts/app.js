var app = app || {};

app.createUser = function(e) {
  // when you click on submit, you want to prevent from changing URL
  e.preventDefault();
  // pulling out the input values from the form
  var name = $("form").find("input[name='name']").val();
  var email = $("form").find("input[name='email']").val();

  console.log(name);
  console.log(email);
  // this is the params that will go into the ajax
  var userParams = {
    user: {
      name: name,
      email: email
  }
};

  // ajax request to add data userParams into the data
  $.ajax({
    type: "POST",
    url: "http://localhost:3000/users.json",
    data: userParams
  }).done(function(data) {
    // do something with the response
    console.log('got back this response');
    console.log(data);
  });
};

  // ajax request to get specific student's data
//   var userUrl = "http://localhost:3000/users/" + newUser.id + ".json";

//   $.ajax({
//     type: "GET",
//     url: userUrl
//   }).done(app.displayUser);
// });

  // });

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
    mapTypeId: google.maps.MapTypeId.ROADMAP
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



// document ready
$(document).ready(function() {

  // this tells your browser to look up your current geolocation and grab those coords
  navigator.geolocation.getCurrentPosition(function(position){
    app.lat = position.coords.latitude;
    app.lng = position.coords.longitude;
    app.makeMap();
  });
  // creates map when dom has loaded


  // when you click on the submit button, it triggers the app.createUser
  $(".submit").on("click", app.createUser);

  // eventlistener when drop pin button is clicked
  $("#drop-pin").on("click", app.addPin);

});

