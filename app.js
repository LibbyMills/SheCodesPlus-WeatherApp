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

function showWx(response) {
  let wxDescription = response.data.condition.description;
  let currentWxIcon = document.querySelector("#current-wx-icon");
  let location = response.data.city;
  document.querySelector(
    "#response"
  ).innerHTML = `In ${location} today, ${wxDescription}...`;
  document.querySelector("#today-temp").innerHTML = Math.round(
    response.data.temperature.current
  );
  currentWxIcon.setAttribute(
    "src",
    `https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  currentWxIcon.setAttribute("alt", `${response.data.condition.description}`);
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
function searchCity(city) {
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiURL).then(showWx);
}
function searchLocation(position) {
  let apiURL = `https://api.shecodes.io/weather/v1/current?lon=${position.coords.longitude}&lat=${position.coords.latitude}&key=${apiKey}`;
  axios.get(apiURL).then(showWx);
}
let apiKey = "cf101ecec2aca96b8t364eed41926oa0";
let currentPositionButton = document.querySelector("#current-location");
let form = document.querySelector("#location-input");
form.addEventListener("submit", handleSubmit);
currentPositionButton.addEventListener("click", getLocalWeather);
searchCity("London");
