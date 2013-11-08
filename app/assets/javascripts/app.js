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
    center: new google.maps.LatLng(-34.397, 150.644),
    zoom: 8,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
};

app.addPin = function() {
  var myLatlng = new google.maps.LatLng(-25.363882,131.044922);

  var marker = new google.maps.Marker({
    position: myLatlng,
    title:"Hello World!"
  });

  marker.setMap(map);
};


// document ready
$(document).ready(function() {

// creates map when dom has loaded
  app.makeMap();

// when you click on the submit button, it triggers the app.createUser
  $(".submit").on("click", app.createUser);

  // eventlistener when drop pin button is clicked
  $("#drop-pin").on("click", app.addPin);
});

