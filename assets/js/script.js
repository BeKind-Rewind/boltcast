var searchCityFormEl = document.querySelector("#formSearch");
var cityEl = document.querySelector("#cityInput");
var searchListEl = document.querySelector("#recentSearch");
var todayForecastEl = document.querySelector("#rightNowStatus");
var currentDateEl = document.querySelector("#currentDate");
var dailyContainerEl = document.querySelector("#extendedForecast");



// This is "submit" event listening delegated to function "formSubmitHandler": "when button is clicked the response to the input is this:"
var formSubmitHandler = function(event){
    event.preventDefault();

    var searchCityInput = document.querySelector("input[name='cityInput']").value;

    // create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "search-item";

    // create div to hold search info and add to list item
    var searchInfoEl = document.createElement("div");

    // give it a class name
    searchInfoEl.className = "search-info";

    // add HTML content to div
    searchInfoEl.innerHTML = "<h3 class='cityInput'>" + searchCityInput + "</h3>";
    listItemEl.appendChild(searchInfoEl);

    // add list item to list
    searchListEl.appendChild(listItemEl);

    var cityInput = cityEl.value.trim();
    if (cityInput) {
        getForecast(cityInput);
        // To clear the input textarea after search
        // cityEl.value = "";   
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
            var currentTime = new Date(data.dt * 1000);
            var currentDate = document.getElementById("currentDate");
            currentDate.textContent = data.name + " " + currentTime;
            
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
                    
                    // 5 day forecast createElement cards from array?
                    // var daily = document.getElementById("five-day-list-item");
                    // var weatherCard = [
                    //     new Date(data.daily[i].dt * 1000),
                    //     document.getElementById('dailyIcon').src = `http://openweathermap.org/img/w/${data.daily.weather[0].icon}.png`,
                    //     temp= data.daily[i].temp.day,
                    //     wind= data.daily[i].wind_speed,
                    //     humidity = data.daily[i].humidity,
                    // ]
                })
                
        })
        .catch(function(error) {
            alert("Unable to connect to Weather");
    });
};

searchCityFormEl.addEventListener("submit", formSubmitHandler);