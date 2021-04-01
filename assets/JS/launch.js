const flightName = document.getElementById("flight-name");
const flightDate = document.getElementById("flight-date");
const flightImage = document.getElementById("flight-image");
const flightMap = document.getElementById("map-image");
const flightCaption = document.getElementById("flight-caption")




function getFlightInfo() {
  var launchEventUrl = "https://lldev.thespacedevs.com/2.0.0/launch/upcoming/" ;
  fetch(launchEventUrl, {
    key: "Authorization",
    // value: "Token 30e8842577e5f6666308813bfefb7be8a7b38f40",
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      console.log(data.results[0].pad.map_image);
      flightName.textContent = data.results[0].name;
      flightDate.textContent = new Date(data.results[0].net).toLocaleString();
      flightImage.setAttribute("src", data.results[4].image);
      flightMap.setAttribute("src", data.results[0].pad.map_image);
      flightCaption.textContent = data.results[0].pad.location.name;
      //manipulate the dom
    });
}
getFlightInfo();
