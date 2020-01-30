const request = require("request");

const url = process.env.DARKSKY;
const lat_long = "37.8267,-122.4233";
const endpoint = url + lat_long;


request({url: endpoint, json: true }, (error, response) => {
    console.log(response.body.currently);
});