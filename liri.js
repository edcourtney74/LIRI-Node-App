// Grab dotenv package
require("dotenv").config();

// Grab axios package
var axios = require("axios");

// Grab moment package
var moment = require("moment");

// Importing keys.js as a variable
var keys = require("./keys.js")

// Setting variable with Spotify keys info - NOT SURE IF THIS IS WORKING, WAITING FOR CLASS
var spotify = new Object(keys.spotify);

// Variable for task entered in command line
var task = process.argv[2];

// Variable for movie, band, etc. entered in command line
var userChoice = process.argv[3]; 

// Capitalize userChoice if user entered something
if (userChoice) {
    
    userChoice = userChoice.charAt(0).toUpperCase() + userChoice.slice(1);
}

// Switch statement to select which process to run
switch (task) {
    case "concert-this":
        // Send API request via axios, using userChoice variable
        axios
            .get("https://rest.bandsintown.com/artists/" + userChoice + "/events?app_id=codingbootcamp")

            // Once API response is received...
            .then(function(response) {
                                               
                // Console.log a title for the results
                console.log (userChoice + "'s next 10 shows");
                
                // Do a for loop to go through the first 10 items returned by the API
                for (i = 0; i < 9; i++) {
                    // Set a variable for venue section of the response
                    var venue = response.data[i].venue;                  
                                        
                    // Info to display in console log
                    console.log("--------------------")
                    console.log("Venue: " + venue.name);
                    console.log("Location: " + venue.city + ", " + venue.region);
                    // Use moment.js to convert date format
                    console.log("Date: " + moment(response.data[i].datetime).format("MM/DD/YY"));
                }            
            });
        break;
    
    case "spotify-this-song":
        console.log("Spotify this!")
        break;
    
    case "movie-this":
        
        // If the user didn't enter a movie, make userChoice "Mr. Nobody"
        if (!userChoice) {
            userChoice = "Mr. Nobody"
        }
        
        // Send API request via axios, using userChoice variable
        axios
            .get("http://www.omdbapi.com/?t=" + userChoice + "&apikey=trilogy")

            // Once API response is received...
            .then(function(response) {
                               
                // Set response.data to a variable
                var res = response.data;
                
                // Info to display in console log
                console.log("Title: " + res.Title);
                console.log("Year: " + res.Year);
                console.log("IMDB Rating: " + res.imdbRating);
                console.log("Rotten Tomatoes Rating: " + res.Ratings[1].Value);
                console.log("Country of production: " + res.Country);
                console.log("Language: " + res.Language);
                console.log("Plot: " + res.Plot);
                console.log("Actors: " + res.Actors);
                
            });
        break;
    
    case "do-what-it-says":
        console.log("Do what it says!")
        break;
    
    default:
        console.log("Incorrect task entered");
}


