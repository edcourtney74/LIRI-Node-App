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
var userChoice = process.argv.splice(3).join(" ");

// Capitalize userChoice if user entered something
if (userChoice) {
    userChoice = userChoice.charAt(0).toUpperCase() + userChoice.slice(1);
}

// Concatenate task and userChoice to add to log.txt
var userCommand = "\n===============================\n\n" + task + ": " + userChoice + "\n";

// Append command text to log.txt
fs.appendFile("log.txt", userCommand, function (err) {
    if (err) {
        console.log(err);
    }
})

// FUNCTIONS==============================================================
// Function to run when user enters concert-this
function getConcertInfo() {
    // Send API request via axios, using userChoice variable
    axios
        .get("https://rest.bandsintown.com/artists/" + userChoice + "/events?app_id=codingbootcamp")

        // Once API response is received...
        .then(function (response) {

            // Variable for concert title
            var concertTitle = "\n" + userChoice + "'s upcoming shows\n"

            // Console.log a title for the results
            console.log(concertTitle);

            // Append title to log.txt
            fs.appendFile("log.txt", concertTitle, function (err) {
                if (err) {
                    console.log(err);
                }
            })

            // Do a for loop to go through the first 10 items returned by the API
            for (i = 0; i < 9; i++) {
                // Set a variable for venue section of the response
                var venue = response.data[i].venue;

                // Check to see if there is a value in venue.region. If not, set the value of venue.region to venue.country 
                if (!venue.region) {
                    venue.region = venue.country
                }

                // Create variable of all results
                var resultsText = "--------------------\nVenue: "
                    + venue.name + "\nLocation: "
                    + venue.city + ", " + venue.region
                    // Use moment to convert to MM/DD/YY format 
                    + "\nDate: " + moment(response.data[i].datetime).format("MM/DD/YY") + "\n";

                console.log(resultsText);

                // Append results to log.txt
                fs.appendFile("log.txt", resultsText, function (err) {
                    if (err) {
                        console.log(err);
                    }
                })
            }
        })
        .catch(function (err) {
            // Display error to user in console
            console.log("I'm sorry. I couldn't find concert information for " + userChoice + ".");
            // Append error results to log.txt
            fs.appendFile("log.txt", "I'm sorry. I couldn't find concert information for " + userChoice + ".", function (err) {
                if (err) {
                    console.log(err);
                }
            })
        });
}

// Function to run when user enters spotify-this-song
function getSongInfo() {
    // Create new object with Spotify keys
    var spotify = new Spotify({
        id: keys.spotify.id,
        secret: keys.spotify.secret
    });

    // If the user didn't enter a song, make userChoice "Mr. Nobody"
    if (!userChoice) {
        userChoice = "The Sign Ace of Base"
    }

    // Search for song using node-spotify-api
    spotify.search({ type: "track", query: userChoice }, function (err, response) {
        // Display to the user that the top 5 songs will be listed
        console.log("\nHere's the top 5 results I found for " + userChoice + ".");

        // Display message if error is received
        if (err) {
            console.log("I'm sorry. " + userChoice + " could not be found.");
            fs.appendFile("log.txt", "I'm sorry. " + userChoice + " could not be found.", function () {
                if (err) {
                    console.log(err);
                }
            })
        }

        // For loop to go through top 5 songs returned by Spotify
        for (i = 0; i < 5; i++) {

            // Variable to store temporary response object
            var songObj = response.tracks.items[i]

            // Create text variable for console.log and log.txt
            var songText = "\nSong: " + songObj.name
                + "\nArtist(s): " + songObj.artists[0].name
                + "\nAlbum: " + songObj.album.name
                + "\nPreview URL: " + songObj.preview_url + "\n\n------------------";

            // Console log results
            console.log(songText);

            // Append results to log.txt
            fs.appendFile("log.txt", songText, function (err) {
                if (err) {
                    console.log(err);
                }
            })
        }
    });
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

            // Create response variable for console.log, log.txt
            var movieText = "\n*** " + res.Title + " ***"
                + "\nYear: " + res.Year
                + "\nIMDB Rating: " + res.imdbRating
                + "\nRotten Tomatoes Rating: " + res.Ratings[1].Value
                + "\nCountry of production: " + res.Country
                + "\nLanguage: " + res.Language
                + "\nPlot: " + res.Plot
                + "\nActors: " + res.Actors;

            // Console.log results
            console.log(movieText);

            // Append results to log.txt
            fs.appendFile("log.txt", movieText, function (err) {
                if (err) {
                    console.log(err);
                }
            })

        })
        // Set a catch function to long an error if nothing is found
        .catch(function (error) {
            console.log("I'm sorry. I couldn't find any information for that movie.")
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
                    return console.log("I'm sorry. There seems to be a problem.");
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