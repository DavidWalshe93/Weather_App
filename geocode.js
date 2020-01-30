const request = require("request");

const geocode = (address, callback) => {
    const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN;
    const map_box_endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${MAPBOX_TOKEN}&limit=1`;

    request({url: map_box_endpoint, json: true}, (error, response) => {
        if (error) {
            callback("Unable to connect to geo-coding service", undefined)
        } else if (response.body.features.length === 0) {
            callback("Address does not match any coordinates", undefined)
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name,
            })
        }
    });
};

module.exports = geocode;