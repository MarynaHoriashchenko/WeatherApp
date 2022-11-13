let now = new Date();

// current day

let appDay = document.querySelector(".currentData");

let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let year = now.getFullYear();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let month = now.getMonth() + 1;

appDay.innerHTML = `${day}, ${date}/${month}/${year}   ${hours}:${minutes}`;

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#searchInputValues");
  let city = document.querySelector(".choise-city");
  if (searchInput.value) {
    city.innerHTML = `${searchInput.value}`;
  } else {
    city.innerHTML = null;
    alert("Please type your city");
  }

  let units = "metric";
  let apiKey = "64af9709de23cc99a048e62319ab19b7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=${units}`;
  function searchTemperature(response) {
    let country = response.data.sys.country;
    city.innerHTML = `${searchInput.value}, ${country}`;

    let currentCityTemperature = Math.round(response.data.main.temp);
    let currentTemperature = document.querySelector("#temperatureToday");
    currentTemperature.innerHTML = `${currentCityTemperature}°C`;

    let inSky = response.data.weather[0].main;
    let inTheSky = document.querySelector("#inTheSky");
    inTheSky.innerHTML = inSky;

    let temperatureFeelsLike = Math.round(response.data.main.feels_like);
    let tempFeelsLike = document.querySelector("#tempFeelsLike");
    tempFeelsLike.innerHTML = `Feels like ${temperatureFeelsLike}°C`;
  }

  axios.get(apiUrl).then(searchTemperature);
}

function showWeather(show) {
  let currentCityName = show.data.name;
  let city = document.querySelector(".choise-city");
  city.innerHTML = currentCityName;

  let currentCityTemperatureNow = Math.round(show.data.main.temp);
  let currentTemperature = document.querySelector("#temperatureToday");
  currentTemperature.innerHTML = `${currentCityTemperatureNow}°C`;

  let country = show.data.sys.country;
  city.innerHTML = `${currentCityName}, ${country}`;

  let inSky = show.data.weather[0].main;
  let inTheSky = document.querySelector("#inTheSky");
  inTheSky.innerHTML = inSky;

  let temperatureFeelsLike = Math.round(show.data.main.feels_like);
  let tempFeelsLike = document.querySelector("#tempFeelsLike");
  tempFeelsLike.innerHTML = `Feels like ${temperatureFeelsLike}°C`;
}

let form = document.querySelector("#changeInfoCity");
form.addEventListener("submit", search);

// function showCelsius(event) {
//   let temperatureNow = document.querySelector("#temperatureToday");
//   temperatureNow.innerHTML = `17`;
// }

// let celsiusTemperature = document.querySelector("#celsius-link");
// celsiusTemperature.addEventListener("click", showCelsius);

// function showFahrenheit(event) {
//   let temperatureNow = document.querySelector("#temperatureToday");
//   let c = (temperatureNow.innerHTML = 17);
//   let fahrenheitTemperatureClick = Math.round(c * 1.8 + 32);
//   temperatureNow.innerHTML = `${fahrenheitTemperatureClick}`;
// }
// let fahrenheitTemperature = document.querySelector("#fahrenheit-link");
// fahrenheitTemperature.addEventListener("click", showFahrenheit);

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "64af9709de23cc99a048e62319ab19b7";

  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

  axios.get(url).then(showWeather);
}

function showCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("#hereButton");
button.addEventListener("click", showCurrentPosition);
