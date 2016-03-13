$(function() {
  if (navigator.geolocation)
    var local = navigator.geolocation.getCurrentPosition(GetLocation);
});

function GetLocation(location) {
  var lati = location.coords.latitude;
  var long = location.coords.longitude;
  var metrica = "metric";
  temp(lati, long, metrica);
};

function temp(lati, long, metrica) {

  $('.buttonTemp').on('click', function() {
    if (metrica == "metric") {
      metrica = "imperial";
      temp(lati, long, metrica);
    } else {
      metrica = "metric";
      temp(lati, long, metrica);
    }
  });

  $.ajax({
    type: "GET",
    dataType: "json",
    url: "http://api.openweathermap.org/data/2.5/weather?lat=" + lati + "&lon=" + long + "&appid=b1b15e88fa797225412429c1c50c122a&units=" + metrica + "",
    success: function(data) {
      var temperatura = data.main.temp;
      $('.numeroTemp').html(temperatura.toString().split('.')[0]);
      $('.discri').html(data.weather[0].description);
      $('.iconTemp').html("<img src='http://openweathermap.org/img/w/" + data.weather[0].icon + ".png'>");

      console.log(data);
    }
  });
};