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
    }
}

getList();


