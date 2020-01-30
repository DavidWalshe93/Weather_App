const request = require("request");

const geocode = require("./geocode");
const forecast = require("./forecast");

geocode("Dublin", (error, data) => {
    if (error) {
        console.log("Error", error);
    } else {
        forecast(data.latitude, data.longitude, (error, data) => {
            if(error) {
                console.log("Error", error)
            } else {
                console.log(data)
            }
        })
    }
});