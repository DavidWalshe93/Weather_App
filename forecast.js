const request = require("request");


const forecast = (latitude, longitude, location, callback) => {
    const DARKSKY_TOKEN = process.env.DARKSKY_TOKEN;
    const url = `https://api.darksky.net/forecast/${DARKSKY_TOKEN}/${latitude},${longitude}?units=si`;

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback("Unable to connect to weather forecast service", undefined)
        } else if (body.error) {
            callback("Unable to find location", undefined);
        } else {
            const day_summary = body.daily.data[0].summary;
            const current = body.currently;
            callback(undefined, `Weather @ ${location}\n${day_summary} It is currenlty ${current.temperature} degrees out. There is a ${current.humidity}% chance of rain.`);
        }
    })
};


module.exports = forecast;

