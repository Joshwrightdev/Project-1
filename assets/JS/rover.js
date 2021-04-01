console.log("hello world");
var apiKey = "EgPBPuCRfLxgIGWykQFEfYbnf48yDhmbDXqAuMAW";
var queryURL =
  "https://api.nasa.gov/mars-photos/api/v1/rovers/perseverance/latest_photos?api_key=" +
  apiKey;
var roverImageEl = $(".rover-img");
var roverInfoEl = $(".rover-info");
// var roverNameEl = $(".roverName");
// var launchDateEl = $(".launchDate");
// var landingDateEl = $(".landingDate");
// var earthDateEl = $(".earthDate");

fetch(queryURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    $(roverImageEl).attr("src", data.latest_photos[1].img_src);

    var roverName = data.latest_photos[1].rover.name;
    var earthDate = data.latest_photos[1].earth_date;
    var launchDate = data.latest_photos[1].rover.launch_date;
    var landingDate = data.latest_photos[1].rover.landing_date;

    var roverNameEl = $("<li>");
    roverNameEl.text("Rover Name: " + roverName);
    roverInfoEl.append(roverNameEl);

    var earthDateEl = $("<li>");
    earthDateEl.text("Earth Date: " + earthDate);
    roverInfoEl.append(earthDateEl);

    var launchDateEl = $("<li>");
    launchDateEl.text("Launch Date: " + launchDate);
    roverInfoEl.append(launchDateEl);

    var landingDateEl = $("<li>");
    landingDateEl.text("Landing Date: " + landingDate);
    roverInfoEl.append(landingDateEl);
  });
