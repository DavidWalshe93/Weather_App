const request = require("request");

const url = process.env.DARKSKY;
const lat = 37.8267;
const long = -122.4233;
const endpoint = `${url}${lat},${long}?units=si`;


request({url: endpoint, json: true }, (error, response) => {
    const day_summary = response.body.daily.data[0].summary;
    const current = response.body.currently;
    console.log(`${day_summary} It is currenlty ${current.temperature} degrees out. There is a ${current.humidity}% chance of rain.`);
});