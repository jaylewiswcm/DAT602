// var d = new Date();
// document.getElementById("date").innerHTML = d;

var d = new Date();
var day = d.getDay();
var date = d.getDate();
var year = d.getFullYear();
var month = d.getMonth();
var monthArr = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
var dayArr = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
day = dayArr[day];
month = monthArr[month];

function nth(date) {
  if (date > 3 && date < 21) {
    return "th";
  } else if (date == 1 && date == 21 && date == 31) {
    return "st";
  } else if (date == 2 && date == 22) {
    return "nd";
  } else {
    return "rd";
  }
}

document.getElementById("date").innerHTML =
  day + " " + date + nth(date) + " " + month;

// function startTime() {
//   var hour = d.getHours();
//   var min = d.getMinutes();
//   var s = d.getSeconds();
//   min = checkTime(min);
//   function checkTime(i) {
//     if (i < 10) {
//       i = "0" + i;
//     } // add zero in front of numbers < 10
//     return i;
//   }

//   document.getElementById("time").innerHTML = hour + ":" + min + ":" + s;
//   var t = setTimeout(startTime, 500);
// }

function startTime() {
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  m = checkTime(m);
  s = checkTime(s);
  document.getElementById("time").innerHTML = h + ":" + m + ":" + s;
  var t = setTimeout(startTime, 500);
}
function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  } // add zero in front of numbers < 10
  return i;
}
