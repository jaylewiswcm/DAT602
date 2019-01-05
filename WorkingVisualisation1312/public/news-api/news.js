var url =
  "https://newsapi.org/v2/top-headlines?" +
  "sources=bbc-news&" +
  "apiKey=2f4a08dd21ea4f37b38648bee4fbc9cb";

var req = new Request(url);
fetch(req).then(function(response) {
  console.log(response.json());
});

var called = "false";

function firstSetData() {
  $(document).ready(function() {
    $.ajax({
      url: url,
      dataType: "json",
      error: function() {
        console.log("JSON FAILED for data");
      },
      success: function(response) {
        var newsData = document.getElementById("newsData");
        response.articles.forEach(function(element) {
          newsData.insertAdjacentHTML(
            "beforeend",
            "<div class='mySlides fade'>" +
              "<h1 id='sourceName'>" +
              element.author +
              "</h1>" +
              "<li id='headline'>" +
              element.title +
              "</li> " +
              "<li id='description'>" +
              element.description +
              "</li>" +
              "</div>"
          );
        });
      }
    });
  });
}
firstSetData();
