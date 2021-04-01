console.log("hello world");
var apiKey = "EgPBPuCRfLxgIGWykQFEfYbnf48yDhmbDXqAuMAW";
var queryURL =
  "https://api.nasa.gov/mars-photos/api/v1/rovers/perseverance/latest_photos?api_key=" +
  apiKey;
var roverImageEl = $(".rover-img");
var roverNameEl = $(".roverName");
var launchDateEl = $(".launchDate");
var landingDateEl = $(".landingDate");
var earthDateEl = $(".earthDate");

fetch(queryURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    $(roverImageEl).attr("src", data.latest_photos[2].img_src);
  });
