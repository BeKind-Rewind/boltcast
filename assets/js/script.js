// 
var searchCityFormEl = document.querySelector("#search-city-form");
var cityEl = document.querySelector("#cityInput");

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
    var apiUrl = "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/https://api.openweathermap.org/data/2.5/weather?q=" + city + 
    // "&APPID=1f511942224dcd22d6edf0f24728b84c";
    // fetch using the dynamically rendered var apiUrl that includes the input 
    fetch(apiUrl)
        // then we'll run the function of the response to "if/else" whether successful
        .then(function(response){
            if (response.ok) {
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

var displayForecast = function() {

    for () {

    } else {
        
    }
}

searchCityFormEl.addEventListener("submit", formSubmitHandler);


//           <!-- function displayRepos is an involved function, should be the json data array -->
//           <!-- displayRepos = function(repos, searchTerm) whereas "repos" is set by var repoName (which will be the data array in the loop)
//           & "searchTerm" is set by calling on DOM as repoSearchTerm.textContent = searchTerm;
//           FOR LOOP uses "repos[i].owner.login (which means the name of the gitHub account) + "/" + 
//           repos[i].name (which refers to the name of each of the individual repos)" -->

//           <!-- LINK FOR EACH REPO is created with var repoEl = document.createElement('a') 
//           repoEl.classList = styling to list and separate; repoEl.setAttrribute("href", "<html file>?repo=" + repoName);
//           and span created to hold repository name: var titleEl... ('span');
//           titleEll.textContent = repoName; and 
//           repoEl.appendChild(titleEl)
//           -->

//           <!-- STATUS of REPO ISSUE: created another span with var statusEl = document.createElement("span"); if repo count>0 X icon/else success icon-->

//           <!-- LISTS GETTING DISPLAYED IN THE RIGHT PLACE 
//             repoEl.appendChild(titleEl), 
//             repo.appendChild(statusEl), 
//             repoContainerEl.appendChild(repoEl) will get called first and initiate the list populating the right column-->