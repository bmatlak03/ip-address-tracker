const ACCESS_TOKEN =
  "pk.eyJ1IjoiYmFydGVrbTEzMiIsImEiOiJja3B4MjhyZGIwNWI4MnZucXg0Y2F1c2tqIn0.ksnnB0D1i0ni7_PzY2MUzw";

const IP_API_KEY = "at_D35cwthh4vnOs6iIN94YrtR5L97uU";

const form = document.querySelector("form.search-box");
const input = document.querySelector("input.search");
const ip = document.querySelector(".ip");
const locationRes = document.querySelector(".location");
const timezone = document.querySelector(".timezone");
const isp = document.querySelector(".isp");

var mymap = L.map("mapid").setView([51.505, -0.09], 13);
var myIcon = L.icon({
  iconUrl: "./images/icon-location.svg",
});

L.tileLayer(
  `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${ACCESS_TOKEN}`,
  {
    maxZoom: 18,
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken: ACCESS_TOKEN,
  }
).addTo(mymap);
const updateView = (data) => {
  ip.textContent = data.ip;
  locationRes.textContent = `${data.location.city}, ${data.location.region}, ${data.location.country}`;
  timezone.textContent = data.location.timezone;
  isp.textContent = data.isp;
  mymap.setView([data.location.lat, data.location.lng]);

  var marker = L.marker([data.location.lat, data.location.lng], {
    icon: myIcon,
  });
  marker.addTo(mymap);
};
const formSubmit = async (e) => {
  const value = input.value;
  e.preventDefault();
  await fetch(
    `https://geo.ipify.org/api/v1?apiKey=${IP_API_KEY}&ipAddress=${value}&domain=${value}`
  )
    .then((res) => res.json())
    .then((data) => {
      updateView(data);
    });
};

const showMyInfo = async () => {
  const value = input.value;
  await fetch(
    `https://geo.ipify.org/api/v1?apiKey=${IP_API_KEY}&ipAddress=${value}&domain=${value}`
  )
    .then((res) => res.json())
    .then((data) => {
      updateView(data);
    });
};
showMyInfo();
form.addEventListener("submit", formSubmit);
