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
              "<li id='headline'>" +
              element.title +
              "</li> " +
              "</br>" +
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
// function secondSetData() {
//   $(document).ready(function() {
//     $.ajax({
//       url: url,
//       dataType: "json",
//       error: function() {
//         console.log("JSON FAILED for data");
//       },
//       success: function(response) {
//         var newsData = document.getElementById("newsData");

//         response.articles.slice(3, 6).forEach(function(element) {
//           newsData.insertAdjacentHTML(
//             "beforeend",
//             "<div class='mySlides fade'>" +
//               "<li id='headline'>" +
//               element.title +
//               "</li> " +
//               "</br>" +
//               "<li id='description'>" +
//               element.description +
//               "</li>" +
//               "</div>"
//           );
//         });
//       }
//     });
//   });
// }

firstSetData();

// var timer1 = setInterval(firstSetData, 3000);
// var timer2 = setInterval(secondSetData, 1000);

// if (called == false) {
//   timer1;
// } else {
//   timer2;
// }
