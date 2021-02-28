function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDays = date.getDay();
  let currentDate = date.getDate();
  let currentHour = date.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMinute = date.getMinutes();
  if (currentMinute < 10) {
    currentMinute = `0${currentMinute}`;
  }

  return `${days[currentDays]} ${currentDate} ${currentHour}:${currentMinute}`;
}

function showData(response) {
  document.querySelector("#citySearch").innerHTML = response.data.name;
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
  console.log(description);
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

function search(city) {
  let apiKey = "94f7962a3f3dc99473c20e9f4d42062e";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  //let apiKeyNews = "4f8ff1068c6cb0df700d188319fcfdb0";
  //let apiUrlNews = `http://api.mediastack.com/v1/news?access_key=${apiKeyNews}&keywords=${city}&sources=en`;
  axios.get(apiUrl).then(showData);
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
  axios.get(apiUrl).then(showDataLocation);
  //let apiUrlLocation = `https://api.openweathermap.org/data/2.5/find?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  //axios.get(apiUrlLocation).then(showCity);
}

function showDataLocation(response) {
  document.querySelector("#citySearch").innerHTML = response.data.name;
  document.querySelector("#number").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#precipitation").innerHTML =
    response.data.main.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

function showCity(response) {
  document.querySelector("#citySearch").innerHTML = response.data.list[0].name;
  document.querySelector("#cityNews").innerHTML = response.data.list[0].name;
}

function showNews(response) {
  document.querySelector("#title1").innerHTML = response.data.data[0].title;
  document.querySelector("#description1").innerHTML =
    response.data.data[0].description;
  document.querySelector("#title2").innerHTML = response.data.data[1].title;
  document.querySelector("#description2").innerHTML =
    response.data.data[1].description;
  document.querySelector("#title3").innerHTML = response.data.data[2].title;
  document.querySelector("#description3").innerHTML =
    response.data.data[2].description;
}

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

document.querySelector("#currentDate").innerHTML = formatDate(new Date());
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
