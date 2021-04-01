// DOM VARIABLES
marsCardText = $("#mars-card-text")
marsCurrentSolEl = $("#current-sol")

// FETCHING MARS WEATHER DATA

// GLOBAL VARIALBES
apiKey = "EgPBPuCRfLxgIGWykQFEfYbnf48yDhmbDXqAuMAW"
requestUrl = "https://api.nasa.gov/insight_weather/?api_key=EgPBPuCRfLxgIGWykQFEfYbnf48yDhmbDXqAuMAW&feedtype=json&ver=1.0"
// currentDay = moment().format("MMM Do, YYYY")

// currentSeason = ""
// currentSol = ""

marsCardIntro = $("<p>")
marsCardIntro.text("This data was collected from Elysium Planetia, a flatt smooth plain near Mars' equator. The 'sol' number represents one solar day out of a Martian year. This data is not representative of all weather on Mars.")

function getApi(requestUrl) {
    fetch(requestUrl)
        .then(function (response) {
            console.log(response)
            return response.json() })

            .then(function (data) {
                console.log("MARS DATA:",data)
                currentSol = data.sol_keys[2]
                marsCurrentSolEl.text("Sol: "+currentSol)

                var seasonArray = data[currentSol]
                var currentSeason= seasonArray.Season

                var seasonEl = $("<p>")
                seasonEl.text("Current Season: "+currentSeason)
                marsCardText.append(seasonEl)

                dataArray = data[currentSol]

                // CHECKING FOR DATA--NEED TO DO THIS FOR PRESSURE AS WELL

                if (dataArray.PRE) {
                    console.log("hi")
                    avAtmosphericPressure= dataArray.PRE.av
                }
                
                if (dataArray.AT) {
                    avTemperature = dataArray.AT.av
                } else {
                    avTemperature = "NO DATA"
                }

                if (dataArray.HWS) {
                    avWinds = dataArray.HWS.av
                } else {
                    avWinds = "NO DATA"
                }

                var pressureEl = $("<p>")
                pressureEl.text("Atmospheric Pressure on Sol " + currentSol + ": "+avAtmosphericPressure)
                marsCardText.append(pressureEl)

                var tempEl = $("<p>")
                tempEl.text("Average Temperature: " + avTemperature)
                marsCardText.append(tempEl)

                var windsEl = $("<p>")
                windsEl.text("Average Horizontal Winds: " + avWinds)
                marsCardText.append(windsEl)

            })
                      
}

getApi(requestUrl)