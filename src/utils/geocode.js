const request = require("request");

const geocode = (address, callback) => {
    const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN;
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${MAPBOX_TOKEN}&limit=1`;

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback("Unable to connect to geo-coding service", undefined)
        } else if (body.features.length === 0) {
            callback("Address does not match any coordinates", undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name,
            })
        }
    });
};

module.exports = geocode;