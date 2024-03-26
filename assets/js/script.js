// A weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city



const userSearch = document.getElementsByClassName("weather-input");
const searchHistoryEl = document.getElementsByClassName("history-div");
const weatherDiv = document.getElementsByClassName("weather-div");


const APIKey = "baa5f2cd8b92122ca79c18d7b7213dc5";


// Checks current weather based on search
function checkWeather(event) {
    event.preventDefault()
    const recentSearch = userSearch.value();

    
}


// Gets current longitude and latitude to check current forecast
function checkForecast(){
    const apiURL = `https://api.openweathermap.org/geo/1.0/direct?q=${recentSearch}&limit=1&appid=${apiKey}`;
    fetch(apiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            //console.log(data);
            const userLong = JSON.parse(data[0].userLong);
            const userLat = JSON.parse(data[0].userLat);
            localStorage.setItem("lon", userLong);
            localStorage.setItem("lat", userLat);
            console.log(`Longitude: ${userLong} Latitude: ${userLat}`);
        });
}


function displayWeatherResults() {
    // Create a card to store all elements
    // Create an area on the card to place elements
    // Create card title
    

    // Add all elements to the card body

    // Get required data
    checkForecast();
    checkWeather();

}

function showForecast(data){

}


function setNewLocation(event){

}

searchButton.addEventListener("click", checkWeather);
historyButton.addEventListener("click", setNewLocation);