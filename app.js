const request = require("request");

const url = process.env.DARKSKY;
const lat_long = "37.8267,-122.4233";
const endpoint = url + lat_long;


request({url: endpoint}, (error, response) => {
    const data = JSON.parse(response.body);
    console.log(data.currently);
});