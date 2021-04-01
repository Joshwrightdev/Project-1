const flightName = document.getElementById('flight-name');
const flightDate = document.getElementById("flight-date");
const flightImage = document.getElementById("flight-image");

var spaceEventsContainer = $("#space-events");
function getFlightInfo() {
  var spaceEventsURL = "https://lldev.thespacedevs.com/2.0.0/launch/upcoming/";
  fetch(spaceEventsURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("jude")
      console.log(data);
      console.log(data.results[0].pad.map_image)
      flightName.textContent=data.results[0].name
      flightDate.textContent= new Date(data.results[0].net).toLocaleString()
      flightImage.setAttribute("src", data.results[0].pad.map_image)
      
      
      //manipulate the dom
    });
}
getFlightInfo();
