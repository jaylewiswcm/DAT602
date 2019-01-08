let url2 =
  "http://api.openweathermap.org/data/2.5/weather?q=Plymouth,uk?id=524901&APPID=408a89a5a62965fbf812dcfbd64c953e";

var req2 = new Request(url2);
fetch(req2).then(function(response) {
  console.log(response.json());
});

function getWeatherData() {
  $.ajax({
    url: url2,
    type: "GET",
    dataType: "json",
    success: function(data) {
      var temperature = data.main.temp;
      var location = data.name;
      celsius = Math.round(temperature - 273.15);

      $(".location-temp").html(location + ", ");
      $(".weather-temp").html(celsius + "&#8451;");
      console.log(celsius);
    },
    error: function(err) {
      alert("Oops something went wrong, Please try again.");
      console.log(err);
    }
  });
}

getWeatherData();
