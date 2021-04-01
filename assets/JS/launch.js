var spaceEventsContainer = $("#space-events");
function getSpaceEvents() {
  var spaceEventsURL = "https://lldev.thespacedevs.com/2.0.0/launch/upcoming/";
  fetch(spaceEventsURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
}
getSpaceEvents();
