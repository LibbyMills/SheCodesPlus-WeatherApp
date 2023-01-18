let now = new Date();
let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
let day = days[now.getDay()];
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minute = now.getMinutes();
let dtg = document.querySelector(".dtg");
dtg.innerHTML = `${day} ${hour}:${minute}`;

function showWx(response) {
  let wxDescription = response.data.weather[0].description;
  let location = response.data.name;
  document.querySelector(
    "#response"
  ).innerHTML = `It is ${wxDescription} in ${location} today`;
  document.querySelector("#today-temp").innerHTML = Math.round(
    response.data.main.temp
  );
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
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(showWx);
}

function searchLocation(position) {
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(showWx);
}
let apiKey = "bd3ff741f58b13df62ca6260d9e2d474";
let currentPositionButton = document.querySelector("#current-location");
let form = document.querySelector("#location-input");
form.addEventListener("submit", handleSubmit);
currentPositionButton.addEventListener("click", getLocalWeather);
searchCity("London");
