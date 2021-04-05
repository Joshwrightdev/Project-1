// LAUNCH JS
const flightName = document.getElementById("flight-name");
const flightDate = document.getElementById("flight-date");
const flightImage = document.getElementById("flight-image");
const flightMap = document.getElementById("map-image");
const flightCaption = document.getElementById("flight-caption")




function getFlightInfo() {
  var launchEventUrl = "https://lldev.thespacedevs.com/2.0.0/launch/upcoming/" ;
  fetch(launchEventUrl, {
    key: "Authorization",
    value: "Token 30e8842577e5f6666308813bfefb7be8a7b38f40",
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      console.log(data.results[0].pad.map_image);
      flightName.textContent = data.results[0].name;
      flightDate.textContent = new Date(data.results[0].net).toLocaleString();
      flightImage.setAttribute("src", data.results[0].image);
      flightMap.setAttribute("src", data.results[0].pad.map_image);
      flightCaption.textContent = data.results[0].pad.location.name;
      //manipulate the dom
    });
}
getFlightInfo();


// MARS WEATHER JS
// DOM VARIABLES
marsCardText = $("#mars-card-text")
marsCurrentSolEl = $("#current-sol")
pressureValEl = $("#pressure-value")
tempValEl = $("#temp-value")
windValEl = $("#wind-value")
seasonValEl = $("#season-value")

// FETCHING MARS WEATHER DATA

// GLOBAL VARIALBES
apiKey = "EgPBPuCRfLxgIGWykQFEfYbnf48yDhmbDXqAuMAW"
requestUrl = "https://api.nasa.gov/insight_weather/?api_key=EgPBPuCRfLxgIGWykQFEfYbnf48yDhmbDXqAuMAW&feedtype=json&ver=1.0"
// currentDay = moment().format("MMM Do, YYYY")

// currentSeason = ""
// currentSol = ""

marsCardIntro = $("<p>")
marsCardIntro.text("This data was collected from Elysium Planetia, a flat smooth plain near Mars' equator. The 'sol' number represents one solar day out of a Martian year. This data is not representative of all weather on Mars.")
marsCardIntro.addClass("mars-intro")

marsCardImage = $("<img>")
marsCardImage.attr("src", "https://live.staticflickr.com/4676/39442533234_de41d49a60_b.jpg")
marsCardImage.addClass("mars-image")

marsCardText.append(marsCardIntro)
marsCardText.append(marsCardImage)

function getApi(requestUrl) {
    fetch(requestUrl)
        .then(function (response) {
            return response.json()
        })

        .then(function (data) {
            currentSol = data.sol_keys[2]
            marsCurrentSolEl.text("Sol " + currentSol)

            var seasonArray = data[currentSol]
            var currentSeason = seasonArray.Season

            dataArray = data[currentSol]

            // CHECKING FOR DATA--NEED TO DO THIS FOR PRESSURE AS WELL
            if (seasonArray.Season) {
                currentSeason = seasonArray.Season
                seasonValEl.addClass("mars-data")
                seasonValEl.append(currentSeason)
                
            }

            if (dataArray.PRE) {
                avAtmosphericPressure = dataArray.PRE.av
                pressureValEl.addClass("mars-data")
                pressureValEl.append(avAtmosphericPressure)
            } else {
                pressureValEl.addClass("no-data")
                pressureValEl.text("NO DATA")
            }

            if (dataArray.AT) {
                avTemperature = dataArray.AT.av
                tempValEl.addClass("mars-data")
                tempValEl.append(avTemperature)
            } else {
                tempValEl.addClass("no-data")
                tempValEl.text("NO DATA")
            }

            if (dataArray.HWS) {
                avWinds = dataArray.HWS.av
                windValEl.addClass("mars-data")
                windValEl.append(avWinds)
            } else {
                windValEl.addClass("no-data")
                windValEl.text("NO DATA")
            }

            // var pressureEl = $("<p>")
            // pressureEl.text("Atmospheric Pressure on Sol " + currentSol + ": " +avAtmosphericPressure)
            // marsCardText.append(pressureEl)

            // var tempEl = $("<p>")
            // tempEl.text("Average Temperature: " + avTemperature)
            // marsCardText.append(tempEl)

            // var windsEl = $("<p>")
            // windsEl.text("Average Horizontal Winds: " + avWinds)
            // marsCardText.append(windsEl)

        })

}

getApi(requestUrl)

// NOTES PAD

// DOM VARIABLES
var noteFormEl = $("#note-form")
var noteInputEl = $("#note-input")
var savedNotesEl = $("#saved-notes")
var clearButtonEl = $("#clear-button")


var notesArray = []
// when submit is clicked, we run this function that prevents default, 
// adds user input to an array called notesArray and sets it to local storage.
// it also runs the function get list

noteFormEl.on("submit", function (event) {
    notesArray = JSON.parse(localStorage.getItem("notesArray")) || [];
    event.preventDefault();
    var noteInput = noteInputEl.val();
    notesArray.push(noteInput);
    localStorage.setItem("notesArray", JSON.stringify(notesArray))
    noteInputEl.val('');

    getList()

})

clearButtonEl.click(function (event) {
  event.preventDefault();
  localStorage.removeItem("notesArray");
  getList()
})

// get list gets the value of notesArray from storage, iterates through the list, 
// and appends each item to savedNotesP, which is then appended to savedNotes
function getList() {

    if (localStorage.getItem("notesArray")) {
        notesArray = JSON.parse(localStorage.getItem("notesArray")) || [];
        savedNotesEl.empty();
        for (i = 0; i < notesArray.length; i++) {
            var savedNotesP = $("<ul>")
            notesLi = $("<li>").text(notesArray[i])
            savedNotesP.append(notesLi)
            savedNotesEl.append(savedNotesP)
        }
    } else {
      savedNotesEl.empty();
    }
}

getList();



// ROVER JS
console.log("hello world");
var apiNasaKey = "EgPBPuCRfLxgIGWykQFEfYbnf48yDhmbDXqAuMAW";
var queryURL =
  "https://api.nasa.gov/mars-photos/api/v1/rovers/perseverance/latest_photos?api_key=" +
  apiNasaKey;
var curQueryURL =
  "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&camera=fhaz&api_key=" +
  apiNasaKey;
var roverImageEl = $(".per-rover-img");
var curiosityImageEl = $(".cur-rover-img");
var roverInfoEl = $(".rover-info");
const carousel = $("#carouselExampleFade");
const carouselItem = $(".carousel-item img");
const actualItem = $(".carousel-item");
//flag to show which image we're on
let state = true;

function createRoverText(rover) {
  var wrapper = $("<div>");
  wrapper.addClass("rover-wrapper");
  var roverName = rover.rover.name;
  var earthDate = rover.earth_date;
  var launchDate = rover.rover.launch_date;
  var landingDate = rover.rover.landing_date;
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

  wrapper.append(roverNameEl);
  wrapper.append(earthDateEl);
  wrapper.append(launchDateEl);
  wrapper.append(landingDateEl);
  return wrapper;
}

$(document).ready(
  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      let rover = data.latest_photos[1];
      let landingEl;
      if (rover) {
        $(carouselItem[0]).attr("src", rover.img_src);

        landingEl = createRoverText(rover);
      } else {
        rover = data.latest_photos[0];
        if (rover) {
          $(carouselItem[0]).attr("src", rover.img_src);

          landingEl = createRoverText(rover);
        }
      }

      roverInfoEl.append(landingEl);

      fetch(curQueryURL)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);
          let landingEl2 = createRoverText(data.photos[0]);

          roverInfoEl.append(landingEl2);
          landingEl2.attr("style", "display: none");

          $(carouselItem[1]).attr("src", data.photos[0].img_src);
          $(".carousel-control-next").on("click", function () {
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
    })
);

// SPACE EVENTS JS
var spaceEventsContainer = $('#space-events');

function getSpaceEvent() {
    var spaceEventsURL = "https://ll.thespacedevs.com/2.0.0/event/upcoming/";

    fetch(spaceEventsURL, {
        key: "Authorization",
        value: "Token 30e8842577e5f6666308813bfefb7be8a7b38f40",
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            //dynamically generate elements to display
            var eventTitle = $('<h3>').addClass("card-title").text("Upcoming Events");
            var eventName = $('<div>').addClass("card-header").text(data.results[0].name + " " + moment(data.results[0].date).format("MMM, DD, YYYY"));
            var eventDescription = $('<p>').addClass("card-text").text('"' + data.results[0].description + '"');
            var eventImage = $('<img>').addClass("card-img event-img").attr("src", data.results[0].feature_image);
            var eventURL = $('<a>').attr("href", data.results[0].news_url).attr("target", "_blank").text("Read more here");
            //append those elements
            spaceEventsContainer.append(eventTitle);
            spaceEventsContainer.append(eventName);
            spaceEventsContainer.append(eventDescription);
            spaceEventsContainer.append(eventURL);
            spaceEventsContainer.append(eventImage);

        })
};

getSpaceEvent()
