// Grab dotenv package
require("dotenv").config();

// Grab axios package
var axios = require("axios"); 

// Importing keys.js as a variable
var keys = require("./keys.js")

// Setting variable with Spotify keys info - NOT SURE IF THIS IS WORKING, WAITING FOR CLASS
var spotify = new Object(keys.spotify);

// Variable for task entered in command line
var task = process.argv[2];

// Variable for movie, band, etc. entered in command line
var userChoice = process.argv[3]; 

// Switch statement to select which process to run
switch (task) {
    case "concert-this":
        console.log("Concert this!")
        // Send API request via axios, using userChoice variable
        axios
            .get("https://rest.bandsintown.com/artists/" + userChoice + "/events?app_id=codingbootcamp")

            // Once API response is received...
            .then(function(response) {
                
                // Do a for loop to go through the first 10 items returned by the API
                for (i = 0; i < 9; i++) {
                    // Set a variable for venue section of the response
                    var venue = response.data[i].venue;
                    
                    // Info to display in console log
                    console.log("--------------------")
                    console.log("Venue: " + venue.name);
                    console.log("Location: " + venue.city + ", " + venue.region);
                    console.log("Date: " + venue.datetime);
                }
                
                
            });
        break;
    case "spotify-this-song":
        console.log("Spotify this!")
        break;
    case "movie-this":
        console.log("Movie this!")
        break;
    case "do-what-it-says":
        console.log("Do what it says!")
        break;
    default:
        console.log("Incorrect task entered");
}


