const request = require("request");

const geocode = (address, callback) => {
    const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN;
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${MAPBOX_TOKEN}&limit=1`;
    // const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/New York.json?access_token=pk.eyJ1IjoiZHdhbHNoZTkzIiwiYSI6ImNrNjFheXE5dTAxZTcza28wZHhqNWtlZGkifQ.Tan1qtJ79NtS4qK2xgpHSQ&limit=1";
    console.log(url)
    request({url, json: true}, (error, {body}) => {
        if (error) {
            console.error("Unable to connect to geo-coding service");
            callback("Unable to connect to geo-coding service", undefined)
        } else if (body.features.lenght === 0) {
            console.log("Address does not match any coordinates");
            callback("Address does not match any coordinates", undefined)
        } else {
            console.log(body);
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name,
            })
        }
    });
};

module.exports = geocode;