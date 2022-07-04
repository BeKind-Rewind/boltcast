// 5-day by city, state, country code:    api.openweathermap.org/data/2.5/forecast?q=" + city + "," + state + "," + country + "&units=imperial&appid=" + API_key
// 5-day by zip code, country code:     api.openweathermap.org/data/2.5/forecast?zip=" + zip "," + country + "&units=imperial&appid=" + API_key


var searchCityFormEl = document.querySelector("#search-city-form");
var cityEl = document.querySelector("#cityInput");
var dailyContainerEl = document.querySelector("#extendedForecast")

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
    console.log(event);
};

// function getForcast passing "city" will use the api call to query for the array of information associated with that "city" and DISPLAY it 
var getForecast = function(city) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + apiKey;
    var apiKey = "/Users/amandaperry/Desktop/SMU_Bootcamp/boltcast/.env";
    // fetch using the dynamically rendered var apiUrl that includes the input 
    fetch(apiUrl)
        // then we'll run the function of the response to "if/else" whether successful
        .then(function(response){
            if (response.ok) {
                // extract the data from the JSON
                response.json().then(function(data){
                    displayForecast(data, city);
                });
            } else {
                alert("Unable to display weather");
            }
        })
        .catch(function(error) {
            alert("Unable to connect to Weather");
        });
};

var displayForecast = function(dailyArr) {
    if (dailyArr.length === 0) {
        // TODO create and call DOM
        dailyContainerEl.textContent = "No forecast found.";
        return;
    }
    dailyContainerEl.textContent = "";

    for (var i = 0; i < dailyArr.length; i++) {
        // format the dailyArr name
        var dailyArrName = dailyArr[i].name + "/" + dailyArr[i].dt_text;
        
        var forecastEl = document.createElement("a");
        forecastEl.classList = "list-item flex-row justify-space-between align-center";
        // create a span element to hold repository name
        var titleEl = document.createElement("span");
        titleEl.textContent = dailyArrName;

        forecastEl.appendChild(titleEl);

        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";

        // icons for statuses 
        if (199 < dailyArr[i].weather.id < 233) {
            statusEl.innerHTML = 
            dailyArr[i].weather.id + "<i class='status-icon icon=11d'></i>";
            //<link href="http://openweathermap.org/img/wn/11d@2x.png" />
        } else if (299 < dailyArr[i].weather.id < 322) {
            statusEl.innerHTML = 
            dailyArr[i].weather.id + "<i class='status-icon icon=09d'></i>";
            //<link href="http://openweathermap.org/img/wn/09d@2x.png" />
        } else if (499 < dailyArr[i].weather.id < 505) {
            statusEl.innerHTML = 
            dailyArr[i].weather.id + "<i class='status-icon icon=10d'></i>";
            //<link href="http://openweathermap.org/img/wn/10d@2x.png" />
        } else if (dailyArr[i].weather.id === 511) {
            statusEl.innerHTML = 
            dailyArr[i].weather.id + "<i class='status-icon icon=13d'></i>";
            //<link href="http://openweathermap.org/img/wn/13d@2x.png" />
        } else if (519 < dailyArr[i].weather.id < 532) {
            statusEl.innerHTML = 
            dailyArr[i].weather.id + "<i class='status-icon icon=09d'></i>";
            //<link href="http://openweathermap.org/img/wn/09d@2x.png" />
        } else if (599 < dailyArr[i].weather.id < 623) {
            statusEl.innerHTML = 
            dailyArr[i].weather.id + "<i class='status-icon icon=13d'></i>";
            //<link href="http://openweathermap.org/img/wn/10d@2x.png" />
        } else if (700 < dailyArr[i].weather.id < 782) {
            statusEl.innerHTML = 
            dailyArr[i].weather.id + "<i class='status-icon icon=50d'></i>";
            //<link href="http://openweathermap.org/img/wn/50d@2x.png" />
        } else if (dailyArr[i].weather.id === 801) {
            statusEl.innerHTML = 
            dailyArr[i].weather.id + "<i class='status-icon icon=02d'></i>";
            //<link href="http://openweathermap.org/img/wn/02d@2x.png" />
        } else if (dailyArr[i].weather.id === 802) {
            statusEl.innerHTML = 
            dailyArr[i].weather.id + "<i class='status-icon icon=03d'></i>";
            //<link href="http://openweathermap.org/img/wn/03d@2x.png" />
        } else if (dailyArr[i].weather.id === 803) {
            statusEl.innerHTML = 
            dailyArr[i].weather.id + "<i class='status-icon icon=04d'></i>";
            //<link href="http://openweathermap.org/img/wn/04d@2x.png" />
        } else if (dailyArr[i].weather.id === 804) {
            statusEl.innerHTML = 
            dailyArr[i].weather.id + "<i class='status-icon icon=01d'></i>";
            //<link href="http://openweathermap.org/img/wn/04d@2x.png" />
        } else {
            statusEl.innerHTML = 
            dailyArr[i].weather.id + "<i class='status-icon icon=01d'></i>";
            //<link href="http://openweathermap.org/img/wn/01d@2x.png" />
        }
        // append to container
        forecastEl.appendChild(statusEl);
        dailyContainerEl.appendChild(forecastEl);
    };
    console.log(dailyArr);
   
};

searchCityFormEl.addEventListener("submit", formSubmitHandler);

// weather array language:
// name (City Name)
// weather.main (one word description)
// weather.description (synopsis)
// main.temp
// main.feels_like
// main.humidity (in %)
// main.temp_min
// main.temp_max
// wind.speed (in mph)
// clouds.all (cloudiness, %)
// sys.sunrise
// sys.sunset

// icon URL: http://openweathermap.org/img/wn/10d@2x.png







//           <!-- LISTS GETTING DISPLAYED IN THE RIGHT PLACE 
//             repoEl.appendChild(titleEl), 
//             repo.appendChild(statusEl), 
//             repoContainerEl.appendChild(repoEl) will get called first and initiate the list populating the right column-->