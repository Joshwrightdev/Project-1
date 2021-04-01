var spaceEventsContainer = $('#space-events');

function getSpaceEvent() {
    var spaceEventsURL = "https://ll.thespacedevs.com/2.0.0/event/upcoming/";

    fetch(spaceEventsURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            console.log(data.results[0].news_url);
            var eventTitle = $('<h5>').addClass("card-title").text("Upcoming Events");
            var eventName = $('<div>').addClass("card-header").text(data.results[0].name + moment(data.results[0].date).format("MMM, DD, YYYY"));
            var eventDescription = $('<p>').addClass("card-text").text('"' + data.results[0].description + '"');
            var eventImage = $('<img>').addClass("card-img").attr("src", data.results[0].feature_image);
            var eventURL = $('<a>').attr("href", data.results[0].news_url).attr("target", "_blank").text("Read more here");
            spaceEventsContainer.append(eventTitle);
            spaceEventsContainer.append(eventName);
            spaceEventsContainer.append(eventDescription);
            spaceEventsContainer.append(eventURL);
            spaceEventsContainer.append(eventImage);

        })
};

getSpaceEvent()
