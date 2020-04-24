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

  function saveEvent() {
    var eventDetails = {
      time: timeID,
      event: textArea,
    };

    console.log(eventDetails);
    localStorage.setItem("storedEvent", JSON.stringify(eventDetails));

    // var allEvents = localStorage.getItem("storedEvent");

    // if (allEvents === null) {
    //   localStorage.setItem("storedEvent", JSON.stringify(eventDetails));
    // } else {
    //   storedEvent = JSON.parse(allEvents);
    //   storedEvent.push(eventDetails);
    //   localStorage.setItem("storedEvent", JSON.stringify(storedEvent));
    // }
    // console.log(allEvents);
  }

  function loadEvents() {
    allEvents = JSON.parse(localStorage.getItem("storedEvent"));
    console.log(allEvents.time);
    console.log(allEvents.event);

    var eventBlock = $("#" + allEvents.time + "> textarea");
    console.log(eventBlock);

    eventBlock.html(allEvents.event);
  }

  loadEvents();
  renderTimeblocks();

  let buttons = $(".saveBtn");
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function () {
      //gets the time id of the row
      timeID = this.parentNode.id;
      console.log("time ID: " + timeID);
      // gets text associated with clicked button
      textArea = this.previousElementSibling.value;
      console.log("Textarea value: " + textArea);

      saveEvent();
    });
  }
});
