let now = new Date();
let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
let day = days[now.getDay()];
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}
let dtg = document.querySelector(".dtg");
dtg.innerHTML = `${day} ${hour}:${minute}`;

function showForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-3">
      <div>${day}</div>
        <div class="row text-center">
          <div class="col-4">
            <div class="wx-icon">
              <img src="#" class="current-wx-icon" id="current-wx-icon" />
            </div>
          </div>
          <div class="col-8">
            <ul class="forecast-temp">
              <li>4°</li>
              <li>2°</li>
            </ul>
          </div>
        </div>
     </div>`;
  });

  forecastElement.innerHTML = forecastHTML + `</div>`;
}

function showWx(response) {
  let wxDescription = response.data.condition.description;
  let currentWxIcon = document.querySelector("#current-wx-icon");
  let location = response.data.city;
  celsiusTemperature = Math.round(response.data.temperature.current);
  document.querySelector(
    "#response"
  ).innerHTML = `In ${location} today...${wxDescription}.`;
  document.querySelector("#today-temp").innerHTML = celsiusTemperature;
  currentWxIcon.setAttribute(
    "src",
    `https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  currentWxIcon.setAttribute("alt", `${response.data.condition.description}`);
  getForecast(response.data.coordinates);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-Input").value;
  searchCity(city);
}
function getLocalWeather(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
function getForecast(coordinates) {
  let apiForecastURL = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
  console.log(apiForecastURL);
  axios.get(apiForecastURL).then(showForecast);
}

function searchCity(city) {
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiURL).then(showWx);
}
function searchLocation(position) {
  let apiURL = `https://api.shecodes.io/weather/v1/current?lon=${position.coords.longitude}&lat=${position.coords.latitude}&key=${apiKey}`;
  axios.get(apiURL).then(showWx);
}

function getFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#today-temp");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}
function getCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#today-temp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}
let celsiusTemperature = null;
let fahrenheitLink = document.querySelector("#fahrenheit");
let celsiusLink = document.querySelector("#celsius");
let apiKey = "cf101ecec2aca96b8t364eed41926oa0";
let currentPositionButton = document.querySelector("#current-location");
let form = document.querySelector("#location-input");
fahrenheitLink.addEventListener("click", getFahrenheit);
celsiusLink.addEventListener("click", getCelsius);
form.addEventListener("submit", handleSubmit);
currentPositionButton.addEventListener("click", getLocalWeather);
searchCity("London");
