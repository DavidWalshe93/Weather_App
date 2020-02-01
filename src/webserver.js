const path = require("path");

const express = require('express');
const hbs = require("hbs");

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "..", "public");
const viewsPath = path.join(__dirname, "..", "templates", "views");
const partialsPath = path.join(__dirname, "..", "templates", "partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static resources for express
app.use(express.static(publicDirectoryPath));


app.get("", (req, res) => {
    res.render("index", {
        title: "Weather App",
        name: "Dave"
    })
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Me",
        name: "Dave"
    })
});

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        name: "Dave",
        message: "This is a page to show help messages"
    })
});

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Please input an address to search for."
        })
    }

    res.send({
        forecast: "It is raining",
        location: "Cork",
        address: req.query.address
    });
});

app.get("/help/*", (req, res) => {
    res.render("help", {
        title: "Help",
        name: "Dave",
        message: "This is a page to show help messages"
    })
});

app.get("*", (req, res) => {
    res.render("404_page", {
        title: "404 Error",
        name: "Dave",
    })
});

app.listen(3000, () => {
    console.log("Server is up on port 3000.")
});