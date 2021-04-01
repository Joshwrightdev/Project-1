// DOM VARIABLES
marsCardText = $("#mars-card-text")
marsCurrentSolEl = $("#current-sol")
// FETCHING MARS WEATHER DATA

apiKey = "EgPBPuCRfLxgIGWykQFEfYbnf48yDhmbDXqAuMAW"
requestUrl = "https://api.nasa.gov/insight_weather/?api_key=EgPBPuCRfLxgIGWykQFEfYbnf48yDhmbDXqAuMAW&feedtype=json&ver=1.0"

currentSeason = ""

function getApi(requestUrl) {
    fetch(requestUrl)
        .then(function (response) {
            console.log(response)
            return response.json() })

            .then(function (data) {
                var seasonArray = data[data.sol_keys[0]]
                var currentSeason= seasonArray.Season

                var seasonEl = $("<p>")
                seasonEl.text("Current Season: "+currentSeason)
                marsCardText.append(seasonEl)

                array832 = data[data.sol_keys[0]]
                avAtmosphericPressure= array832.PRE.av

                var pressureEl = $("<p>")
                pressureEl.text("Atmospheric Pressure on Sol " + data.sol_keys[0] + ": "+avAtmosphericPressure)
                marsCardText.append(pressureEl)

                var tempEl = $("<p>")
                tempEl.addClass("temp-text-small")
                tempEl.text("NASA has temporarily suspended temperature data on Mars at this time.")
                marsCardText.append(tempEl)

            })
                      
}

marsCurrentSolEl.text("")

getApi(requestUrl)