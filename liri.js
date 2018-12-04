// Configure dotenv package
require("dotenv").config();

// Grab axios, spotify, moment and fs packages
var axios = require("axios");
var Spotify = require("node-spotify-api");
var moment = require("moment");
var fs = require("fs");

// Importing keys.js as a variable
var keys = require("./keys.js");

// Variable for task entered in command line
var task = process.argv[2];

// Variable for movie, band, etc. entered in command line
var userChoice = process.argv[3];

// Capitalize userChoice if user entered something
if (userChoice) {

    userChoice = userChoice.charAt(0).toUpperCase() + userChoice.slice(1);
}

// FUNCTIONS==============================================================
// Function to run when user enters concert-this
function getConcertInfo() {
    // Send API request via axios, using userChoice variable
    axios
        .get("https://rest.bandsintown.com/artists/" + userChoice + "/events?app_id=codingbootcamp")

        // Once API response is received...
        .then(function (response) {

            // Console.log a title for the results
            console.log(userChoice + "'s next 10 shows");

            // Do a for loop to go through the first 10 items returned by the API
            for (i = 0; i < 9; i++) {
                // Set a variable for venue section of the response
                var venue = response.data[i].venue;

                // Info from response data to display in console log
                console.log("--------------------")
                console.log("Venue: " + venue.name);
                console.log("Location: " + venue.city + ", " + venue.region);
                // Use moment.js to convert date format
                console.log("Date: " + moment(response.data[i].datetime).format("MM/DD/YY"));
            }
        });
}

// Function to run when user enters spotify-this-song
function getSongInfo() {
    // Create new object with Spotify keys
    var spotify = new Spotify({
        id: keys.spotify.id,
        secret: keys.spotify.secret
    })
console.log(spotify)

}

// Function to run when user enters movie-this
function getMovieInfo() {
    // If the user didn't enter a movie, make userChoice "Mr. Nobody"
    if (!userChoice) {
        userChoice = "Mr. Nobody"
    }

    // Send API request via axios, using userChoice variable
    axios
        .get("http://www.omdbapi.com/?t=" + userChoice + "&apikey=trilogy")

        // Once API response is received...
        .then(function (response) {

            // Set response.data to a variable
            var res = response.data;

            // Info from response datato display in console log 
            console.log("*** " + res.Title + " ***");
            console.log("Year: " + res.Year);
            console.log("IMDB Rating: " + res.imdbRating);
            console.log("Rotten Tomatoes Rating: " + res.Ratings[1].Value);
            console.log("Country of production: " + res.Country);
            console.log("Language: " + res.Language);
            console.log("Plot: " + res.Plot);
            console.log("Actors: " + res.Actors);
        });
}

// Set function to run switch function to determine which process to run
function taskSelected() {
    switch (task) {
        case "concert-this":
            // Run concert function
            getConcertInfo();
            break;

        case "spotify-this-song":
            console.log("Spotify this!")
            getSongInfo();
            break;

        case "movie-this":
            // Run movie function
            getMovieInfo();
            break;

        case "do-what-it-says":

        // Read the random.txt file
            fs.readFile("random.txt", "utf8", function (error, data) {

                // If code experiences errors, log it to the console
                if (error) {
                    return console.log(error);
                }

                // Split data by commas into a new array
                var dataArr = data.split(",");

                // Set array items to variables
                task = dataArr[0];
                
                // Set second item in array as userChoice
                userChoice = dataArr[1];

                // Run switch statement again with new info
                taskSelected();
            })

            break;

        default:
            console.log("Incorrect task entered");
    }
}

// Starts switch statement to determine which process to run
taskSelected();


