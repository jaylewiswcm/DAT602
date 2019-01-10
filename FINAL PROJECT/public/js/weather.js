let url2 =
  "http://api.openweathermap.org/data/2.5/weather?q=Plymouth,uk?id=524901&APPID=408a89a5a62965fbf812dcfbd64c953e";

var req2 = new Request(url2);
fetch(req2).then(function(response) {
  console.log(response.json());
});

var sunsetImg = "../assets/Sunset.svg";
var sunriseImg = "../assets/Sunrise.svg";

var currentDate = new Date();
var currentHours = currentDate.getHours();
var currentMinutes = currentDate.getMinutes();

// var currentTime = currentHours + ":" + currentMinutes;
var currentTime = currentHours + ":" + currentMinutes;

var iconPic = "../assets/weathericons/";

getWeatherData();
setInterval(getWeatherData, 30000);

function getWeatherData() {
  $.ajax({
    url: url2,
    type: "GET",
    dataType: "json",
    success: function(data) {
      var temperature = data.main.temp;
      var location = data.name;
      var sunset = data.sys.sunset;
      var sunrise = data.sys.sunrise;
      var icon = data.weather[0].icon;

      var dateSet = new Date(sunset * 1000);
      var hoursSet = dateSet.getHours();
      var minutesSet = "0" + dateSet.getMinutes();
      var secondsSet = "0" + dateSet.getSeconds();

      var sunsetTime = hoursSet + ":" + minutesSet.substr(-2);

      var myDate = new Date(); // Your timezone!
      var myEpoch = Math.round(myDate.getTime() / 1000.0);
      // var myEpoch = 1547051612; // testing
      var dateRise = new Date(sunrise * 1000);
      var hoursRise = dateRise.getHours();
      var minutesRise = "0" + dateRise.getMinutes();
      var secondsRise = "0" + dateRise.getSeconds();

      var sunriseTime = hoursRise + ":" + minutesRise.substr(-2);

      celsius = Math.round(temperature - 273.15);

      // var type = "13d"; // Testing

      $(".location-temp").html(location + ", ");
      $(".weather-temp").html(celsius + "&#8451;");
      $(".iconpic").attr("src", "../assets/weathericons/" + icon + ".png");

      if (sunset >= myEpoch && sunrise < myEpoch) {
        $(".sunset-rise").html(
          sunsetTime + '<img class="sImg" src="' + sunsetImg + '" />'
        );
      } else {
        $(".sunset-rise").html(
          sunriseTime + '<img class="sImg" src="' + sunriseImg + '" />'
        );
      }

      console.log(celsius);
      console.log(myEpoch);
      console.log("sunset time: " + sunset);
      console.log("sunrise time: " + sunrise);
      console.log("current time: " + currentTime);
    },
    error: function(err) {
      alert("Oops something went wrong, Please try again.");
      console.log(err);
    }
  });
}
