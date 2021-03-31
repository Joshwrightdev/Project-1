// DOM VARIABLES

// FETCHING MARS WEATHER DATA

apiKey = "EgPBPuCRfLxgIGWykQFEfYbnf48yDhmbDXqAuMAW"
requestUrl = "https://api.nasa.gov/insight_weather/?api_key=EgPBPuCRfLxgIGWykQFEfYbnf48yDhmbDXqAuMAW&feedtype=json&ver=1.0"

function getApi(requestUrl) {
    fetch(requestUrl)
        .then(function (response) {
            console.log(response)
            return response.json() })

            .then(function (data) {
                console.log(data)
                var array = data[828]
                console.log(array.Season)
                var currentSeason=array.Season
            })
            
            var seasonEl = $("<p>")
            seasonEl.text("Current Season: "+array.Season)


            
}

getApi(requestUrl)