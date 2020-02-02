// Author:  David Walshe
// Date:    02/02/2020

// Built-ins Modules
const path = require("path");

// NPM Modules
const express = require('express');
const hbs = require("hbs");
const chalk = require("chalk");

// Local Modules
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

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

// Base URL
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
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            res.send({
                error: error
            });
            console.log(chalk.red("Error", error));
        } else {
            forecast(latitude, longitude, location, (error, data) => {
                if (error) {
                    res.send({
                        error: error
                    });
                    console.log(chalk.red("Error", error))
                } else {
                    res.send(data);
                    console.log(chalk.green(data))
                }
            })
        }
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