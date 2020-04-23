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

  function saveEvent() {}

  // // function save local storage
  // //set item key time
  // // json stringify

  // var event = localStorage.getItem("time");

  // if (event == null) {
  //   localStorage.setItem("time", JSON.stringify(textareatext));
  // } else {
  //   time = JSON.parse(event);
  //   time.push(event);
  //   localStorage.setItem("time", JSON.stringify(time));
  // }

  renderTimeblocks();
  var textArea;
  var timeID;

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
