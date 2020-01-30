const request = require("request");

// Weather
const DARKSKY_TOKEN = process.env.DARKSKY_TOKEN;
const lat = 37.8267;
const long = -122.4233;
const darksky_endpoint = `https://api.darksky.net/forecast/${DARKSKY_TOKEN}/${lat},${long}?units=si`;

console.log(darksky_endpoint);


request({url: darksky_endpoint, json: true }, (error, response) => {
    const day_summary = response.body.daily.data[0].summary;
    const current = response.body.currently;
    console.log(`${day_summary} It is currenlty ${current.temperature} degrees out. There is a ${current.humidity}% chance of rain.`);
});

// Forward Geocoding
const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN;
const address = "Los Angeles".replace(" ", "%20");
const map_box_endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${MAPBOX_TOKEN}&limit=1`;

console.log(map_box_endpoint);

request({url: map_box_endpoint, json: true}, (error, response) => {
    const latitude = response.body.features[0].center[1];
    const longtitude = response.body.features[0].center[0];
    console.log(`Lat: ${latitude}, Long: ${longtitude}`)
});
