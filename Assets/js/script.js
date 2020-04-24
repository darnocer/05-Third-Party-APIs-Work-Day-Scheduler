$(document).ready(function () {
  var currentDate = moment().format("dddd MMMM Do YYYY");
  $("#currentDay").append(currentDate);

  var timeslots = [
    "07AM",
    "08AM",
    "09AM",
    "10AM",
    "11AM",
    "12PM",
    "1PM",
    "2PM",
    "3PM",
    "4PM",
    "5PM",
    "6PM",
    "7PM",
  ];

  var textArea;
  var timeID;

  // populates times for each time block
  function renderTimeblocks() {
    for (i = 0; i < timeslots.length; i++) {
      var timeslotText = $("<p>");
      if (timeslots[i].startsWith("0")) {
        timeslotText.text(timeslots[i].slice(1));
      } else {
        timeslotText.text(timeslots[i]);
      }
      timeslotText.appendTo($(".hour")[i]);
    }
    renderColorCode();
  }

  // adds classes to change color
  function renderColorCode() {
    var currentHour = moment().format("hA");
    console.log("current hour: " + currentHour);

    for (i = 0; i < timeslots.length; i++) {
      var currentDescription = $(".description")[i];

      if (currentHour === timeslots[i]) {
        currentDescription.classList.add("present");
      } else if (currentHour > timeslots[i]) {
        currentDescription.classList.add("past");
      } else {
        currentDescription.classList.add("future");
      }
    }
  }
  var allEvents;
  // saves events in localstorage corresponding to time blocks
  function saveEvent() {
    allEvents = JSON.parse(localStorage.getItem("schedule"));
    console.log(allEvents);
    var replaced = false;

    // based on user button click
    var eventDetails = {
      time: timeID,
      event: textArea,
    };

    // if there are no saved events, add event details to the array
    if (allEvents === null) {
      allEvents = [];
      allEvents.push(eventDetails);
    } else {
      // otherwise, check for existing events with the same time block and replace them
      for (var i = 0; i < allEvents.length; i++) {
        if (eventDetails.time === allEvents[i].time) {
          allEvents.splice(i, 1, eventDetails);
          replaced = true;
        }
      }
      // if the array already had values but not for the current time block, add event details to the end of array
      if (!replaced) {
        allEvents.push(eventDetails);
      }
      replaced = false;
    }
    // send all of the events to local storage
    localStorage.setItem("schedule", JSON.stringify(allEvents));
  }

  function loadEvents() {
    // retrieve events and convert to object
    allEvents = JSON.parse(localStorage.getItem("schedule"));

    if (allEvents !== null) {
      for (i = 0; i < allEvents.length; i++) {
        // find the textarea associated with the time
        var eventBlock = $("#" + allEvents[i].time + "> textarea");
        // populate the event in the text area
        eventBlock.html(allEvents[i].event);
      }
    }
  }

  loadEvents();
  renderTimeblocks();

  // if any of the saveBtns are clicked
  let buttons = $(".saveBtn");
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function () {
      //gets the time id of the row
      timeID = this.parentNode.id;

      // gets text associated with clicked button
      textArea = this.previousElementSibling.value;

      saveEvent();
    });
  }
});
