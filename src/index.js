function formatDate(timestamp) {
  let date = new Date(timestamp);
  let number = date.getDate();
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let year = date.getFullYear();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let month = date.getMonth() + 1;
  return `${day}, ${number}/${month}/${year}  ${hours}:${minutes}`;
}

function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let number = date.getDate();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];

  return `${day} ${number}`;
}

function displayForecast(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forcastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forcastHTML =
        forcastHTML +
        `<div class="col-2">
      <div class="dot">
        <div class="weather-forecast-date">
          <div id="weatherForecastDayOfWeek">${formatForecastDay(
            forecastDay.dt
          )}</div>
          <div id="weatherForecastDay"></div>
        </div>
      </div>
        <div class="weather-forecast-temperature">${Math.round(
          forecastDay.temp.day
        )}°</div>
          <img src="emoji/${forecastDay.weather[0].icon}.png"
 alt="" width="80"/>
        </div>`;
    }
  });

  forcastHTML = forcastHTML + `</div>`;
  forecastElement.innerHTML = forcastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let units = "metric";
  let apiKey = "1a2b7258ebd456c01aef9175dfe8b709";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;
  // `https://api.shecodes.io/weather/v1/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&key=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let currentTemperature = document.querySelector("#temperatureToday");
  let city = document.querySelector(".choise-city");
  let country = response.data.sys.country;
  let wholeCityName = response.data.name;
  let inSky = document.querySelector("#inTheSky");
  let tempFeelsLike = document.querySelector("#tempFeelsLike");
  let dateElement = document.querySelector("#currentData");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  currentTemperature.innerHTML = Math.round(celsiusTemperature);
  city.innerHTML = `${wholeCityName}, ${country}`;
  inSky.innerHTML = response.data.weather[0].main;
  tempFeelsLike.innerHTML = Math.round(response.data.main.feels_like);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute("src", `emoji/${response.data.weather[0].icon}.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function search(city) {
  let units = "metric";
  let apiKey = "64af9709de23cc99a048e62319ab19b7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#searchInputValues");
  search(searchInput.value);
}

let form = document.querySelector("#changeInfoCity");
form.addEventListener("submit", handleSubmit);

search("London");
