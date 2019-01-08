let url =
  "http://api.openweathermap.org/data/2.5/weather?q=Plymouth,uk?id=524901&APPID=408a89a5a62965fbf812dcfbd64c953e";

function getWeatherData() {
  $.ajax({
    url: url,
    type: "GET",
    dataType: "json",
    success: function(data) {
      var temperature = data.main.temp;
      celsius = Math.round(temperature - 273.15);

      $(".temp").html(celsius + "&#8451;");
      console.log(celsius);
    },
    error: function(err) {
      alert("Oops something went wrong, Please try again.");
      console.log(err);
    }
  });
}

getWeatherData();
