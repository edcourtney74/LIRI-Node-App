# LIRI-Node-App
LIRI is a command-line node app that returns info on concerts, music and movies based on the user's input.

## Features
  * LIRI comes with four functions for the user.
  * LIRI uses APIs from Bands in Town, Spotify and Online Movie Database.
### Concert Search
  * The user enters the phrase "concert-this" and a singer or band he or she would like to see in concert.
  * LIRI returns information for up to 10 of the next concerts listed for the artist/band at bandsintown.com.
  * Information returned includes venue name, city, state/country, and date.
  * If no state is listed, LIRI returns the country instead.
  * If no concert information is found, LIRI lets the user know that no information was found.
### Song Search
  * The user enters the phrase "spotify-this-song" and LIRI returns information for that song, including the song title that best matches the user's input, the artist, the album name, and a link to a 30-second preview of the song on Spotify.
  * If the user does not input a song, the information for "The Sign" by Ace of Base will be displayed.
  * If the user does input a song but it didn't yield any results, LIRI lets the user know that no information was found.
### Movie Search
  * The user enters the phrase "movie-this" and LIRI returns information for that movie, including the year it was made, the rating on IMDB, the rating on Rotten Tomatoes, the country of production, the language, the plot and the actors. 
  * If the user does not input a movie, the information for "Mr. Nobody" will be displayed.
  * If the user does input a movie but it didn't yield any results, LIRI lets the user know that no information was found.
### Do What It Says
  * This function reads the file random.txt and runs the task and input in that file. 
  * The default is currently the spotify-this-song function for "I Want It That Way," but this can be easily changed by edited random.txt.
### Other features
  * The user input and results are displayed in both the terminal and in a file called log.txt. Log.txt keeps track of all LIRI history.
  * The first letter of the user's input is capitalized for a nicer look.

  
  
  
  
  
  
  
  
  
  ***
### Start screen
![Start screen photo](https://github.com/edcourtney74/TriviaGame/blob/master/assets/images/start-screen.png "Start screen")

### Question screen
![Question screen photo](https://github.com/edcourtney74/TriviaGame/blob/master/assets/images/question-screen.png "Question screen")

### Answer screen
![Answer screen photo](https://github.com/edcourtney74/TriviaGame/blob/master/assets/images/answer-screen.png "Answer screen")

### Results screen
![Results screen photo](https://github.com/edcourtney74/TriviaGame/blob/master/assets/images/results-screen.png "Results screen")
