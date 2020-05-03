const weather = document.getElementsByClassName("js-weather");
const API_KEY = "d6cd21b86c79ca9892ae6db9431fb0ae";
const COORDS = "coords";

function getWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  )
    .then(function(response) {
      // console.log(response.json());
      return response.json();
    })
    .then(function(json) {
      // console.log(json);
      const temperature = json.main.temp;
      const place = json.name;
      weather.innerText = `${temperature} @ ${place}`;
    });
}

function savecoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude
  };
  savecoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError() {
  console.log("fail to handle geo");
}

function askForCords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadsCords() {
  const loadedCords = localStorage.getItem(COORDS);
  if (loadedCords === null) {
    askForCords();
  } else {
    const parseCoords = JSON.parse(loadedCords);
    // console.log(parseCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}

function init() {
  loadsCords();
}

init();
