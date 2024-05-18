
const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const displayDays = document.querySelector(".displayDays");
const recentSearch = document.querySelector(".recent-searches");
const apiKey = "baa5f2cd8b92122ca79c18d7b7213dc5";

let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];

// Adds an event listener to the get Weather button and activates the getWeatherData and get5DayForecast functions
weatherForm.addEventListener("submit", async event => {
    event.preventDefault();
    const city = cityInput.value;
    if(city){
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
            const forecastData = await get5DayForecast(city);
            display5DayForecast(forecastData);
        }
        catch(error){
            console.error(error);
            displayError(error);
        }
    }
    else{
        displayError("Please enter a city");
    }
    //location.reload();
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory))
    cityInput.value = "";
    localStorage.setItem("recentSearch", city);
});


// Displays the search history for weather
function showSearchHistory(){
    for (let i = 0; i < searchHistory.length; i++){
        const searchItem = document.createElement("button");
        searchItem.textContent = searchHistory[i];
        searchItem.classList.add("searchItem");
        recentSearch.appendChild(searchItem);
    }
}

// Gets the weather data for the most recent search
async function getWeatherData(city){
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(apiUrl);

    if(!response.ok){
        throw new Error("Could not fetch weather data");
    }

    return await response.json();
}

// Gets the 5 day forecast for the most recent search
function get5DayForecast(city){
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
    return fetch(apiUrl).then(response => {
        if(!response.ok){
            throw new Error("Could not fetch weather data");
        }
        return response.json();
    });
}

// Displays the weather information for the most recent search and creates the elements for the information
function displayWeatherInfo(data){
    const {name: city, 
           main: {temp, humidity}, 
           weather: [{description, id}]} = data;
    card.textContent = "";
    card.style.display = "flex";

    const windSpeed = data.wind.speed;
    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const windDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${((temp - 273.15) * (9/5) + 32).toFixed(1)}°F`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id);
    windDisplay.textContent = `Wind Speed: ${windSpeed} mph`;
    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    weatherEmoji.classList.add("weatherEmoji");
    windDisplay.classList.add("windDisplay");

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);
    card.appendChild(windDisplay);
}

// Displays the 5 day forecast for the most recent search and creates the elements for the information
function display5DayForecast(data){
    const forecast = data.list;
    const forecastDisplay = document.createElement("div");
    forecastDisplay.classList.add("forecastDisplay");

    for(let i = 0; i < forecast.length; i += 8){
        const {dt_txt, main: {temp, humidity}, weather: [{description, id}]} = forecast[i];
        const forecastCard = document.createElement("div");
        forecastCard.classList.add("forecastCard");

        const dateDisplay = document.createElement("p");
        const tempDisplay = document.createElement("p");
        const humidityDisplay = document.createElement("p");
        const descDisplay = document.createElement("p");
        const weatherEmoji = document.createElement("p");
        const windDisplay = document.createElement("p");

        dateDisplay.textContent = dt_txt;
        tempDisplay.textContent = `${((temp - 273.15) * (9/5) + 32).toFixed(1)}°F`;
        humidityDisplay.textContent = `Humidity: ${humidity}%`;
        descDisplay.textContent = description;
        weatherEmoji.textContent = getWeatherEmoji(id);
        windDisplay.textContent = `Wind Speed: ${data.list[i].main.humidity} mph`;
        dateDisplay.classList.add("dateDisplay");
        tempDisplay.classList.add("tempDisplay");
        humidityDisplay.classList.add("humidityDisplay");
        descDisplay.classList.add("descDisplay");
        weatherEmoji.classList.add("weatherEmoji");
        windDisplay.classList.add("windDisplay");

        forecastCard.appendChild(dateDisplay);
        forecastCard.appendChild(tempDisplay);
        forecastCard.appendChild(humidityDisplay);
        forecastCard.appendChild(descDisplay);
        forecastCard.appendChild(weatherEmoji);
        forecastCard.appendChild(windDisplay);
        forecastDisplay.appendChild(forecastCard);
    }

    displayDays.appendChild(forecastDisplay);
}

// Gets the emoji for the weather based on the weather id
function getWeatherEmoji(weatherId){
    switch(true){
        case (weatherId >= 200 && weatherId < 300):
            return "⚡";
        case (weatherId >= 300 && weatherId < 400):
            return "🌧️";
        case (weatherId >= 500 && weatherId < 600):
            return "🌧️";
        case (weatherId >= 600 && weatherId < 700):
            return "❄️";
        case (weatherId >= 700 && weatherId < 800):
            return "";
        case (weatherId === 800):
            return "☀️";
        case (weatherId >= 801 && weatherId < 810):
            return "☁️";
        default:
            return "";
    }
}

// Displays an error message if the city is not found
function displayError(message){

    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}

showSearchHistory();