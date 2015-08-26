$(document).ready(function() {
   'use strict';
   var weather = {
                  'zip':'75328,de',
                  'units':'metric',
                  'lang':'de'};
                  
   $.getJSON('http://api.openweathermap.org/data/2.5/weather', weather, function(json, textStatus) {  
      
      // calculate sunset/sunrise
      json.sys.sunrise = moment(json.sys.sunrise, "X").fromNow();
      json.sys.sunset = moment(json.sys.sunset, "X").fromNow();
      //json.sys.sunrise = new Date(json.sys.sunrise*1000).toTimeString().substring(0,5);
      //json.sys.sunset  = new Date(json.sys.sunset*1000).toTimeString().substring(0,5);
      
      // map icons
      var iconTable = {
			'01d':'wi-day-sunny',
			'02d':'wi-day-cloudy',
			'03d':'wi-cloudy',
			'04d':'wi-cloudy-windy',
			'09d':'wi-showers',
			'10d':'wi-rain',
			'11d':'wi-thunderstorm',
			'13d':'wi-snow',
			'50d':'wi-fog',
			'01n':'wi-night-clear',
			'02n':'wi-night-cloudy',
			'03n':'wi-night-cloudy',
			'04n':'wi-night-cloudy',
			'09n':'wi-night-showers',
			'10n':'wi-night-rain',
			'11n':'wi-night-thunderstorm',
			'13n':'wi-night-snow',
			'50n':'wi-night-alt-cloudy-windy'
      };
      
      if (json.weather.length > 0) {
         json.weather.icon = iconTable[json.weather[0].icon];   
         json.weather.description = json.weather[0].description;   
      }
      
      
      // build template
      var source   = $("#weather-template").html();
      var template = Handlebars.compile(source);
      var html     = template(json); 
      
      // show template
      $('body').html(html);
      
   });
});