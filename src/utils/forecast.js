const request = require("request");


const forecast = (latitude, longitude, location, callback) => {
    const DARKSKY_TOKEN = process.env.DARKSKY_TOKEN;
    const url = `https://api.darksky.net/forecast/${DARKSKY_TOKEN}/${latitude},${longitude}?units=si`;
    console.log(url)
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback("Unable to connect to weather forecast service", undefined)
        } else if (body.error) {
            callback("Unable to find location", undefined);
        } else {
            const current = body.currently;
            callback(undefined, {
                location: location,
                summary: body.daily.data[0].summary,
                temperature: current.temperature,
                humidity: current.humidity * 100
            });
        }
    })
};

module.exports = forecast;

