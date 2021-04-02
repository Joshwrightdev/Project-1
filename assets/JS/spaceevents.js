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
            //dynamically generate elements to display
            var eventTitle = $('<h3>').addClass("card-title").text("Upcoming Events");
            var eventName = $('<div>').addClass("card-header").text(data.results[0].name + moment(data.results[0].date).format("MMM, DD, YYYY"));
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
