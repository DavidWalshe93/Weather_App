const request = require("request");

const geocode = require("./geocode");

// Weather
const DARKSKY_TOKEN = process.env.DARKSKY_TOKEN;
const lat = 37.8267;
const long = -122.4233;
const darksky_endpoint = `https://api.darksky.net/forecast/${DARKSKY_TOKEN}/${lat},${long}?units=si`;

console.log(darksky_endpoint);


request({url: darksky_endpoint, json: true }, (error, response) => {
    if (error) {
        console.log("Unable to connect to weather forecast service")
    } else if (response.body.error) {
        console.log("Unable to find location")
    } else {
        const day_summary = response.body.daily.data[0].summary;
        const current = response.body.currently;
        console.log(`${day_summary} It is currenlty ${current.temperature} degrees out. There is a ${current.humidity}% chance of rain.`);
    }
});

geocode("Dublin", (error, data) => {
    console.log("Error", error);
    console.log("Data", data);
});