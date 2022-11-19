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

function displayTemperature(response) {
  let currentTemperature = document.querySelector("#temperatureToday");
  let city = document.querySelector(".choise-city");
  let country = response.data.sys.country;
  let wholeCityName = response.data.name;
  let inSky = document.querySelector("#inTheSky");
  let tempFeelsLike = document.querySelector("#tempFeelsLike");
  let dateElement = document.querySelector("#currentData");
  let iconElement = document.querySelector("#icon");

  currentTemperature.innerHTML = Math.round(response.data.main.temp);
  city.innerHTML = `${wholeCityName}, ${country}`;
  inSky.innerHTML = response.data.weather[0].main;
  tempFeelsLike.innerHTML = Math.round(response.data.main.feels_like);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute("src", `emoji/${response.data.weather[0].icon}.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);
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

search("London");

let form = document.querySelector("#changeInfoCity");
form.addEventListener("submit", handleSubmit);
