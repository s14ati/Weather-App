const apiKey = config.apiKey;
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// city name input field pr dalne ke baad ayega
const searchBox = document.querySelector(".search input");
// when we click on search button , it should send the city information in checkWeather()
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const weatherDetails = document.querySelector(".main");
const errorMessage = document.querySelector(".error");

async function checkWeather(cityName) {
    // fetch data from the api in json format(array of objects) and store it into response
    //appid = A common parameter for APIs(e.g., OpenWeather API)that requires authentication using an API key.
    //${apiKey}: Inserts the value of the apiKey variable into the URL.
    // add cityName so that it chnages while entering city name
    const response = await fetch(apiUrl + cityName + `&appid=${apiKey}`);

    // if city name is valid it display 404 error
    if (response.status === 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        // errorMessage.style.display = "block";
        errorMessage.innerHTML = "City not found. Please enter a valid city name.";
    }
    else {

        // data = have all the weather information about the specific city
        // json used = because it converts the body of the HTTP response into a JavaScript object (or array) if the response is in JSON format.
        let data = await response.json();

        // console.log(data);

        // now we need to update data of temp, city,humidity,wind from the api

        // query selector select the class name temp and update data(html) inside it using api
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "Km/h";

        // now change the weather condition image

        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "../Weather-App/Assets/cloud.png";
        }
        else if (data.weather[0].main == "Drizzling") {
            weatherIcon.src = "../Weather-App/Assets/drizzling.jpg";
        }
        else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "../Weather-App/Assets/clear.png";
        }
        else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "../Weather-App/Assets/rain.png";
        }
        else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "../Weather-App/Assets/misty.webp";
        }
        else if (data.weather[0].main == "Snow") {
            weatherIcon.src = "../Weather-App/Assets/snow.webp";
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
        // weatherDetails.style.display = "block";
        // errorMessage.style.display = "none";
    }
}

searchBtn.addEventListener("click", () => {
    // checkWeather() have the city information written in input field . To get the data wriiten in input field we get the searchBox.value
    checkWeather(searchBox.value);

    // Here, searchBox.value will give the city name in the input field , and it will pass the city name in checkWeather() and further processing

})

