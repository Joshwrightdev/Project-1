console.log("hello world");
var apiKey = "EgPBPuCRfLxgIGWykQFEfYbnf48yDhmbDXqAuMAW";
var queryURL =
  "https://api.nasa.gov/mars-photos/api/v1/rovers/perseverance/latest_photos?api_key=" +
  apiKey;
var curQueryURL =
  "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&camera=fhaz&api_key=" +
  apiKey;
var roverImageEl = $(".per-rover-img");
var curiosityImageEl = $(".cur-rover-img");
var roverInfoEl = $(".rover-info");
const carousel = $("#carouselExampleFade");
const carouselItem = $(".carousel-item img");
const actualItem = $(".carousel-item");
//flag to show which image we're on
let state = true;
​
​
function createRoverText(rover) {
  var wrapper = $("<div>");
  wrapper.addClass("rover-wrapper");
  var roverName = rover.rover.name;
  var earthDate = rover.earth_date;
  var launchDate = rover.rover.launch_date;
  var landingDate = rover.rover.landing_date;
​
  var roverNameEl = $("<li>");
  roverNameEl.text("Rover Name: " + roverName);
  roverInfoEl.append(roverNameEl);
​
  var earthDateEl = $("<li>");
  earthDateEl.text("Earth Date: " + earthDate);
  roverInfoEl.append(earthDateEl);
​
  var launchDateEl = $("<li>");
  launchDateEl.text("Launch Date: " + launchDate);
  roverInfoEl.append(launchDateEl);
​
  var landingDateEl = $("<li>");
  landingDateEl.text("Landing Date: " + landingDate);
​
  wrapper.append(roverNameEl);
  wrapper.append(earthDateEl);
  wrapper.append(launchDateEl);
  wrapper.append(landingDateEl);
  return wrapper;
}
​
​
$(document).ready(fetch(queryURL)
.then(function (response) {
  return response.json();
})
.then(function (data) {
  console.log(data);
  let rover = data.latest_photos[1];
  let landingEl;
  if(rover){
    $(carouselItem[0]).attr("src", rover.img_src);
​
    landingEl = createRoverText(rover);
  }else{
    rover = data.latest_photos[0];
    if(rover){
      $(carouselItem[0]).attr("src", rover.img_src);
​
      landingEl = createRoverText(rover);
    }
  }
​
​
  roverInfoEl.append(landingEl);
​
  fetch(curQueryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      let landingEl2 = createRoverText(data.photos[0]);
​
      roverInfoEl.append(landingEl2);
      landingEl2.attr("style", "display: none");
​
      $(carouselItem[1]).attr("src", data.photos[0].img_src);
      $(".carousel-control-next").on("click", function () {
​
        if (state) {
          $(actualItem[0]).removeClass("active");
          $(actualItem[1]).addClass("active");
          landingEl2.attr("style", "display: block");
          landingEl.attr("style", "display: none");
          state = !state;
        } else {
          state = !state;
          $(actualItem[1]).removeClass("active");
          $(actualItem[0]).addClass("active");
          landingEl.attr("style", "display: block");
          landingEl2.attr("style", "display: none");
        }
      });
​
      $(".carousel-control-prev").on("click", function () {
        if (state) {
          state = !state;
          $(actualItem[0]).removeClass("active");
          $(actualItem[1]).addClass("active");
          landingEl2.attr("style", "display: block");
          landingEl.attr("style", "display: none");
        } else {
          state = !state;
          $(actualItem[1]).removeClass("active");
          $(actualItem[0]).addClass("active");
          landingEl.attr("style", "display: block");
          landingEl2.attr("style", "display: none");
        }
      });
    });
}))