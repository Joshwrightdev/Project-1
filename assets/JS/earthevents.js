var spaceEventsContainer = $('#space-events');

var spaceEventsURL = "https://ll.thespacedevs.com/2.0.0/event/upcoming/";

fetch(spaceEventsURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        console.log(data.results[0].name);
        console.log(data.results[0].date);
        console.log(data.results[0].description);
        console.log(data.results[0].news_url);
        var eventName = $('<h5>').addClass("card-title").text(data.results[0].name);
        var eventDate = $('<div>').addClass("card-header").text(data.results[0].date);
        var eventDescription = $('<p>').addClass("card-text").text(data.results[0].description);
        var eventImage = $('<img>').addClass("card-img").attr("src", data.results[0].feature_image);
        // var eventURL = $('<a href= data.results[0].news_url>').attr("src", data.results[0].news_url);
        spaceEventsContainer.append(eventName);
        spaceEventsContainer.append(eventDate);
        spaceEventsContainer.append(eventDescription);
        spaceEventsContainer.append(eventImage);
        spaceEventsContainer.append(eventURL);
    })
