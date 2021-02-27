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

document.querySelector("#currentDate").innerHTML = formatDate(new Date());

function showData(response) {
  document.querySelector("#citySearch").innerHTML = response.data.name;
  document.querySelector("#cityNews").innerHTML = response.data.name;
  document.querySelector("#number").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#precipitation").innerHTML =
    response.data.main.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
}
function search(city) {
  let apiKey = "94f7962a3f3dc99473c20e9f4d42062e";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  let apiKeyNews = "4f8ff1068c6cb0df700d188319fcfdb0";
  let apiUrlNews = `http://api.mediastack.com/v1/news?access_key=${apiKeyNews}&keywords=${city}&sources=en`;
  axios.get(apiUrl).then(showData);
  axios.get(apiUrlNews).then(showNews);
}

function handleSearch(event) {
  event.preventDefault();
  let city = document.querySelector("#form-input").value;
  search(city);
}

document.querySelector("#search").addEventListener("submit", handleSearch);

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
  let apiUrlLocation = `https://api.openweathermap.org/data/2.5/find?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  axios.get(apiUrlLocation).then(showCity);
}

function showDataLocation(response) {
  document.querySelector("#number").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#precipitation").innerHTML =
    response.data.main.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
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
document.querySelector(".location").addEventListener("click", findLocation);

search("London");
