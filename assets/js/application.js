var updater = {
      update_after_seconds: 60,
      check: 0,
      handle: false,

      initialize: function () {
         updater.retrieve();
         updater.monitor();
      },

      monitor: function () {
         setInterval(function () {
            updater.check++;
            var per = (updater.check * 100) / updater.update_after_seconds;
            $('.progress').stop().animate({
               width: per + "%"
            }, 700);
            if (updater.check == updater.update_after_seconds) {
               updater.check = 0;
               updater.retrieve();
            }
         }, 1000);
      },

      retrieve: function () {
         var weather = {
            'q': '75328,de',
            'units': 'metric',
            'lang': 'de'
         };
         $.getJSON('http://api.openweathermap.org/data/2.5/weather', weather, function (json, textStatus) {
               var img = "";

               if (json.sys == null) {
                  json = {
                     name: "City",
                     sys: {
                        sunrise: 0,
                        sunset: 0
                     },
                     weather: {
                        icon: "wi-cloudy",
                        description: "orrrr"
                     },
                     main: {
                        temp_min: 10,
                        temp_max: 20,
                        temp: 18
                     }
                  };
               } else {
                  // calculate sunset/sunrise
                  json.sys.sunrise = moment(json.sys.sunrise, "X").fromNow();
                  json.sys.sunset = moment(json.sys.sunset, "X").fromNow();

                  // map icons
                  var iconTable = {
                     '01d': 'wi-day-sunny',
                     '02d': 'wi-day-cloudy',
                     '03d': 'wi-cloudy',
                     '04d': 'wi-cloudy-windy',
                     '09d': 'wi-showers',
                     '10d': 'wi-rain',
                     '11d': 'wi-thunderstorm',
                     '13d': 'wi-snow',
                     '50d': 'wi-fog',
                     '01n': 'wi-night-clear',
                     '02n': 'wi-night-cloudy',
                     '03n': 'wi-night-cloudy',
                     '04n': 'wi-night-cloudy',
                     '09n': 'wi-night-showers',
                     '10n': 'wi-night-rain',
                     '11n': 'wi-night-thunderstorm',
                     '13n': 'wi-night-snow',
                     '50n': 'wi-night-alt-cloudy-windy'
                  };
                  var bgImage = {
                     '01d': 'sunny',
                     '02d': 'cloudy',
                     '03d': 'cloudy',
                     '04d': 'windy',
                     '09d': 'rainy',
                     '10d': 'rainy',
                     '11d': 'stormy',
                     '13d': 'snow',
                     '50d': 'fog',
                     '01n': 'sunny',
                     '02n': 'cloudy',
                     '03n': 'cloudy',
                     '04n': 'cloudy',
                     '09n': 'rainy',
                     '10n': 'rainy',
                     '11n': 'stormy',
                     '13n': 'snow',
                     '50n': 'windy'
                  };

                  if (json.weather.length > 0) {
                     img = 'url(assets/image/' + bgImage[json.weather[0].icon] + '.jpg)';
                     json.weather.icon = iconTable[json.weather[0].icon];
                     json.weather.description = json.weather[0].description;
                     if (json.weather[0].icon.indexOf('n') !== -1) {
                        $('.bg').addClass("nightmode");
                     } else {
                        $('.bg').removeClass("nightmode");
                     }
                  }
               }
               // build template
               var source = $("#weather-template").html();
               var template = Handlebars.compile(source);
               var html = template(json);

               // show template
               $('.content').html(html);

               $('.bg').css('background-image', img);

            });
         }
};

/**
 * Handling the fullscreen functionality via the fullscreen API
 *
 * @see http://fullscreen.spec.whatwg.org/
 * @see https://developer.mozilla.org/en-US/docs/DOM/Using_fullscreen_mode
 */
function enterFullscreen() {

  var element = document.body;

  // Check which implementation is available
  var requestMethod = element.requestFullScreen ||
                      element.webkitRequestFullscreen ||
                      element.webkitRequestFullScreen ||
                      element.mozRequestFullScreen ||
                      element.msRequestFullscreen;

  if( requestMethod ) {
      requestMethod.apply( element );
  }

}

$(document).ready(function () {
   'use strict';
   moment.locale("de");
   updater.initialize();
   setTimeout(function() {
      enterFullscreen();
   }, 1000);
});

