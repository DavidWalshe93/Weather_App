console.log("Client side javascript file loaded");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const locationMsg = document.querySelector('#location');
const summaryMsg = document.querySelector('#summary');
const temperatureMsg = document.querySelector('#temperature');
const humidityMsg = document.querySelector('#humidity');

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const location = search.value;

    locationMsg.textContent = "Loading weather feed for " + location;
    summaryMsg.textContent = "";
    temperatureMsg.textContent = "";
    humidityMsg.textContent = "";

    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                locationMsg.textContent = "Error: " + data.error;
                summaryMsg.textContent = "";
                temperatureMsg.textContent = "";
                humidityMsg.textContent = "";
            } else {
                locationMsg.textContent = "Location: " + data.location;
                summaryMsg.textContent = "Summary: " + data.summary;
                temperatureMsg.textContent = "Temperature: " + data.temperature + " degrees";
                humidityMsg.textContent = "Humidity: " + data.humidity + "%";
            }
        })
    });
});