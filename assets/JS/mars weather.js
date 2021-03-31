// DOM VARIABLES
marsCardText = $("#mars-card-text")
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
                console.log(data)
                var seasonArray = data[828]
                var currentSeason= seasonArray.Season

                var seasonEl = $("<p>")
                seasonEl.text("Current Season: "+currentSeason)
                console.log(currentSeason)
                marsCardText.append(seasonEl)

                console.log(data[832])
                array832 = data[832]
                console.log(array832.PRE.av)
                avAtmosphericPressure= array832.PRE.av

                var pressureEl = $("<p>")
                pressureEl.text("Atmospheric Pressure: "+ avAtmosphericPressure)
                marsCardText.append(pressureEl)

            })
            



            
}

getApi(requestUrl)