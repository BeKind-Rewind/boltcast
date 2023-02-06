// targets the id of the user input FORM
var searchCityFormEl = document.querySelector("#formSearch");
var cityEl = document.querySelector("#cityInput");
var searchListEl = document.querySelector("#recentSearch");
var todayForecastEl = document.querySelector("#rightNowStatus");
var currentDateEl = document.querySelector("#currentDate");
var recentSearch = document.querySelector(".recentSearch");
var currentUviNumber = document.querySelector(".current-number");

var dailyContainerEl = document.querySelector("#extendedForecast");
var savedSearches = [];


// This is "submit" event listening delegated to function "formSubmitHandler": "when button is clicked the response to the input is this:"
function formSubmitHandler(event) {
    event.preventDefault();

    var searchCityInput = document.querySelector("input[name='cityInput']").value;

    var listItemEl = document.createElement("li");
    listItemEl.className = "search-item";

    var searchInfoEl = document.createElement("div");
    searchInfoEl.className = "search-info";
    searchInfoEl.innerHTML = "<h3 class='cityInput'>" + searchCityInput + "</h3>";

    listItemEl.appendChild(searchInfoEl);
    // ADD A LINK TO ASSOCIATED SEARCH RESULT

    // #recentSearch
    searchListEl.appendChild(listItemEl);

    var cityInput = cityEl.value.trim();
    if (cityInput) {
        getForecast(cityInput);
    }
    formSearch.reset();
};




// function getForcast passing "city" will use the api call to query for the array of information associated with that "city" and DISPLAY it 
var getForecast = function (city) {

    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&APPID=c0009be2dcb013ab4163441f3c52c7e3";
    // fetch using the dynamically rendered var apiUrl that includes the input 
    fetch(apiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            console.log(response);
            var currentTime = new Date(response.dt * 1000);
            var currentDate = document.getElementById("currentDate");
            currentDate.textContent = response.name + " " + currentTime;

            var lat = response.coord.lat
            var lon = response.coord.lon

            fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly&units=imperial&appid=c0009be2dcb013ab4163441f3c52c7e3")
                .then(function (response) {
                    return response.json();
                })
                .then(function (response) {
                    searchHistoryList(city);

                    // add current info to page
                    document.getElementById('icon').src = `https://openweathermap.org/img/w/${response.current.weather[0].icon}.png`;

                    var todaysTemp = document.getElementById("temp");
                    todaysTemp.textContent = "Temp: " + response.current.temp + " deg F";

                    var todaysWind = document.getElementById("wind");
                    todaysWind.textContent = "Wind: " + response.current.wind_speed + " MPH";

                    var todaysHumidity = document.getElementById("humidity");
                    todaysHumidity.textContent = "Humidity: " + response.current.humidity + "%";

                    var todaysUvi = document.getElementById("uvi");
                    var currentUviNumber = response.current.uvi;
                    todaysUvi.textContent = "UVIndex: " + currentUviNumber;


                    console.log(response, "second fetch");

                    // add appropriate background color to current uv index number
                    if (response.current.uvi <= 2) {
                        currentUviNumber.addClass("favorable");
                    } else if (response.current.uvi >= 3 && response.current.uvi <= 7) {
                        currentUviNumber.addClass("moderate");
                    } else {
                        currentUviNumber.addClass("severe");
                    }

                })

        })
        .catch(function (error) {
            // reset search input
            $("#cityInput").val("");

            // alert user that there was an error
            alert("Not a valid city. Try Again!");
        });
};





//*************/
// search history
var searchHistoryList = function (city) {
    $('.past-search:contains("' + city + '")').remove();

    // create entry with city name
    var searchHistoryEntry = $("<p>");
    searchHistoryEntry.addClass("past-search");
    searchHistoryEntry.text(city);

    // create container for entry
    var searchEntryContainer = $("<div>");
    searchEntryContainer.addClass("past-search-container");

    // append entry to container
    searchEntryContainer.append(searchHistoryEntry);

    // append entry container to search history container
    var searchHistoryContainerEl = $("#recentSearch");
    searchHistoryContainerEl.append(searchEntryContainer);

    if (savedSearches.length > 0) {
        // update savedSearches array with previously saved searches
        var previousSavedSearches = localStorage.getItem("savedSearches");
        savedSearches = JSON.parse(previousSavedSearches);
    }

    // add city name to array of saved searches
    savedSearches.push(city);
    localStorage.setItem("savedSearches", JSON.stringify(savedSearches));

    // reset search input
    $("#cityInput").val("");

};

// load saved search history entries into search history container
var loadSearchHistory = function () {
    // get saved search history
    var savedSearchHistory = localStorage.getItem("savedSearches");

    // return false if there is no previous saved searches
    if (!savedSearchHistory) {
        return false;
    }

    // turn saved search history string into array
    savedSearchHistory = JSON.parse(savedSearchHistory);

    // go through savedSearchHistory array and make entry for each item in the list
    for (var i = 0; i < savedSearchHistory.length; i++) {
        searchHistoryList(savedSearchHistory[i]);
    }
};

var fiveDayForecastSection = function (city) {

    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&APPID=c0009be2dcb013ab4163441f3c52c7e3";
    // get and use data from open weather current weather api end point
    fetch(apiUrl)
        // get response and turn it into objects
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            // get city's longitude and latitude
            var lat = response.coord.lat
            var lon = response.coord.lon

            fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly&units=imperial&appid=c0009be2dcb013ab4163441f3c52c7e3")
                // get response from one call api and turn it into objects
                .then(function (response) {
                    return response.json();
                })
                .then(function (response) {
                    console.log(response);

                    // add 5 day forecast title
                    var futureForecastTitle = $("#future-forecast-title");
                    futureForecastTitle.text("5-Day Forecast:")

                    // using data from response, set up each day of 5 day forecast
                    for (var i = 1; i <= 5; i++) {
                        // add class to future cards to create card containers
                        var futureCard = $(".future-card");
                        futureCard.addClass("future-card-details");

                        // add date to 5 day forecast
                        var futureDate = $("#future-date-" + i);
                        date = moment().add(i, "d").format("M/D/YYYY");
                        futureDate.text(date);

                        // add icon to 5 day forecast
                        var futureIcon = $("#future-icon-" + i);
                        futureIcon.addClass("future-icon");
                        var futureIconCode = response.daily[i].weather[0].icon;
                        futureIcon.attr("src", `https://openweathermap.org/img/wn/${futureIconCode}@2x.png`);

                        // add temp to 5 day forecast
                        var futureTemp = $("#future-temp-" + i);
                        futureTemp.text("Temp: " + response.daily[i].temp.day + " \u00B0F");

                        // add humidity to 5 day forecast
                        var futureHumidity = $("#future-humidity-" + i);
                        futureHumidity.text("Humidity: " + response.daily[i].humidity + "%");
                    }
                })
        })
};

//*************/

// called when a search history entry is clicked
$(".recentSearch").on("click", "p", function () {
    // get text (city name) of entry and pass it as a parameter to display weather conditions
    var previousCityName = $(this).text();
    currentWeatherSection(previousCityName);
    fiveDayForecastSection(previousCityName);

    //
    var previousCityClicked = $(this);
    previousCityClicked.remove();
});

loadSearchHistory();


searchCityFormEl.addEventListener("submit", formSubmitHandler);
