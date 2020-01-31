const chalk = require("chalk");
const yargs = require("yargs");

const geocode = require("./geocode");
const forecast = require("./forecast");

yargs.command({
    command: "get",
    describe: "Get a forecast for a given address",
    builder: {
        address: {
            describe: "The textual location of where to get the string for",
            demandOption: true,
            type: "string"
        }
    },
    handler: (argv) => {
        geocode(argv.address, (error, {latitude, longitude, location}) => {
            if (error) {
                console.log(chalk.red("Error", error));
            } else {
                forecast(latitude, longitude, location, (error, data) => {
                    if (error) {
                        console.log(chalk.red("Error", error))
                    } else {
                        console.log(chalk.green(data))
                    }
                })
            }
        });
    }
});

yargs.parse();
