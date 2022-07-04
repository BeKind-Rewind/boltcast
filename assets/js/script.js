// 5-day by city, state, country code:    api.openweathermap.org/data/2.5/forecast?q=" + city + "," + state + "," + country + "&units=imperial&appid=" + API_key
// 5-day by zip code, country code:     api.openweathermap.org/data/2.5/forecast?zip=" + zip "," + country + "&units=imperial&appid=" + API_key
// https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid={API key}
var searchCityFormEl = document.querySelector("#search-city-form");
var cityEl = document.querySelector("#cityInput");
var dailyContainerEl = document.querySelector("#extendedForecast");
var todayForecastEl = document.querySelector("#rightNowStatus");
var currentDateEl = document.querySelector("#currentDate")


// This is "submit" event listening delegated to function "formSubmitHandler": "when button is clicked the response to the input is this:"
var formSubmitHandler = function(event){
    // upon event, this stops the browser from running default operations
    event.preventDefault();
    // turn DOM value into var
    var cityInput = cityEl.value.trim();
    if (cityInput) {
        getForecast(cityInput);
        // clear content
        cityEl.value = "";
        
    }

    
    
};

// function getForcast passing "city" will use the api call to query for the array of information associated with that "city" and DISPLAY it 
var getForecast = function(city) {
    
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&APPID=1f511942224dcd22d6edf0f24728b84c";
    // fetch using the dynamically rendered var apiUrl that includes the input 
    fetch(apiUrl)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data);

            var lat = data.coord.lat
            var lon = data.coord.lon

            fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly&units=imperial&appid=1f511942224dcd22d6edf0f24728b84c")
                .then(function(response){
                    return response.json();
                })
                .then(function(data){
                    document.getElementById('icon').src = `http://openweathermap.org/img/w/${data.current.weather[0].icon}.png`;
                    var todaysTemp = document.getElementById("temp");
                    todaysTemp.textContent = "Temp: " + data.current.temp + " deg F";
                    var todaysWind = document.getElementById("wind");
                    todaysWind.textContent = "Wind: " + data.current.wind_speed + " MPH";
                    var todaysHumidity = document.getElementById("humidity");
                    todaysHumidity.textContent = "Humidity: " + data.current.humidity + "%";
                    var todaysUvi = document.getElementById("uvi");
                    todaysUvi.textContent = "UVIndex: " + data.current.humidity;
                    console.log(data, "second fetch");
                })
        })
        .catch(function(error) {
            alert("Unable to connect to Weather");
    });
};

searchCityFormEl.addEventListener("submit", formSubmitHandler);