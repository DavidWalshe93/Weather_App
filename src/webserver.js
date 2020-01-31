const path = require("path");

const express = require('express');

const app = express();

app.set("view engine", "hbs");

app.use(express.static(path.join(__dirname, "..", "public")));

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
        message: "This is a page to show help messages"
    })
});

app.get("/weather", (req, res) => {
    res.send("Weather page")
});

app.listen(3000, () => {
    console.log("Server is up on port 3000.")
});