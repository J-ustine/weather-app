function formatDate(timestamp) {
  let date = new Date(timestamp);
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
  let currentDate = date.getDate();
  return `${day} ${currentDate} ${formatHour(timestamp)}`;
}
function formatHour(timestamp) {
  let date = new Date(timestamp);
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = date.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  return `${hour}:${minute}`;
}

function showData(response) {
  document.querySelector("#citySearch").innerHTML = response.data.name;
  document.querySelector("#currentDate").innerHTML = formatDate(
    response.data.dt * 1000
  );
  //document.querySelector("#cityNews").innerHTML = response.data.name;
  document.querySelector("#number").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#precipitation").innerHTML =
    response.data.main.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
  celsiusTemperature = Math.round(response.data.main.temp);
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  let description = response.data.weather[0].main;
  if (description === "Clear") {
    document.querySelector("#mediaMeteo").src = sunIconSrc;
  } else {
    if (description === "Clouds") {
      document.querySelector("#mediaMeteo").src = cloudIconSrc;
    } else {
      if (description === "Rain") {
        document.querySelector("#mediaMeteo").src = rainIconSrc;
      } else {
        document.querySelector("#mediaMeteo").src = snowIconSrc;
      }
    }
  }
}

function showForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;
  let description = null;
  function srcImage() {
    if (description === "Clear") {
      return sunIconSrc;
    } else {
      if (description === "Clouds") {
        return cloudIconSrc;
      } else {
        if (description === "Rain") {
          return rainIconSrc;
        } else {
          return snowIconSrc;
        }
      }
    }
  }
  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    description = response.data.list[index].weather[0].main;
    forecastElement.innerHTML += `            
  <div class="col-2">
    <div class="day">
      <span class="hour">${formatHour(forecast.dt * 1000)}</span>
      <br />
      <img src="${srcImage()}" alt="sun" width="110px/>
      <br />
      <span id="temperatureDay1">${Math.round(forecast.main.temp)}</span>°C 
      <br />
      <span class="minMax">
        <strong id="temperatureMinDay1">${Math.round(
          forecast.main.temp_min
        )}</strong>°C -
        <span id="temperatureMaxDay1">${Math.round(
          forecast.main.temp_max
        )}</span>°C</span>
    </div>
  </div>
  `;
  }
}

function search(city) {
  let apiKey = "94f7962a3f3dc99473c20e9f4d42062e";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showData);
  let apiUrlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrlForecast).then(showForecast);
  //let apiKeyNews = "4f8ff1068c6cb0df700d188319fcfdb0";
  //let apiUrlNews = `http://api.mediastack.com/v1/news?access_key=${apiKeyNews}&keywords=${city}&sources=en`;
  //axios.get(apiUrlNews).then(showNews);
}

function handleSearch(event) {
  event.preventDefault();
  let city = document.querySelector("#form-input").value;
  search(city);
}

function findLocation() {
  navigator.geolocation.getCurrentPosition(findDataLocation);
}

function findDataLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "94f7962a3f3dc99473c20e9f4d42062e";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showData);
  //let apiUrlLocation = `https://api.openweathermap.org/data/2.5/find?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  //axios.get(apiUrlLocation).then(showCity);
}

function showCity(response) {
  document.querySelector("#citySearch").innerHTML = response.data.list[0].name;
  document.querySelector("#cityNews").innerHTML = response.data.list[0].name;
}

//function showNews(response) {
//document.querySelector("#title1").innerHTML = response.data.data[0].title;
//document.querySelector("#description1").innerHTML = response.data.data[0].description;
//document.querySelector("#title2").innerHTML = response.data.data[1].title;
//document.querySelector("#description2").innerHTML = response.data.data[1].description;
//document.querySelector("#title3").innerHTML = response.data.data[2].title;
//document.querySelector("#description3").innerHTML = response.data.data[2].description;}

function showCelsiusTemperature(event) {
  event.preventDefault();
  document.querySelector("#number").innerHTML = celsiusTemperature;
  document.querySelector("#celsius").classList.add("active");
  document.querySelector("#farenheit").classList.remove("active");
}
function showFarenheitTemperature(event) {
  event.preventDefault();
  document.querySelector("#number").innerHTML = Math.round(
    (celsiusTemperature * 9) / 5 + 32
  );
  document.querySelector("#celsius").classList.remove("active");
  document.querySelector("#farenheit").classList.add("active");
}

let celsiusTemperature = null;

document
  .querySelector("#celsius")
  .addEventListener("click", showCelsiusTemperature);
document
  .querySelector("#farenheit")
  .addEventListener("click", showFarenheitTemperature);
document.querySelector("#search").addEventListener("submit", handleSearch);
document.querySelector(".location").addEventListener("click", findLocation);

search("Sevilla");

let rainIconSrc = "media/Rain2.svg";
let sunIconSrc = "media/Sun2.svg";
let snowIconSrc = "media/Snow2.svg";
let cloudIconSrc = "media/cloud.svg";
