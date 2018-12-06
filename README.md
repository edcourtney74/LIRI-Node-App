# LIRI-Node-App
LIRI is a command-line node app that returns info on concerts, music and movies based on the user's input.

## Get Started
  * To get information from LIRI, the user must go to the command line and type in "node liri", followed by one of four options and a user input.
  * The four options available (and how to initiate them on the command line):
    * node liri concert-this the national (concert-this must be hyphenated, but the user does not need to use hyphenation or quotations for the artist/band input
    * node liri spotify-this-song about today the national
    * node liri movie-this the breakfast club
    * node liri do-what-it-says (note that the user does not need to include any other input after choosing this option)
### Concert Search
  * LIRI returns information for up to 10 of the next concerts for the artist/band.
  * Information returned includes venue name, city, state/country, and date.
  * If no state is listed, LIRI returns the country instead.
  * If no concert information is found, LIRI lets the user know that no information was found.
  * Utilizes information from Bands In Town API.
  
![Concert-this guide](https://github.com/edcourtney74/LIRI-Node-App/blob/master/images/concert-this.gif "Concert-this" )

### Song Search
  * LIRI returns the song title that best matches the user's input, the artist, the album name, and a link to a 30-second preview of the song on Spotify.
  * Song information is limited to the first five tracks returned in order to not overwhelm the user with information. If fewer than five tracks match the user input, only the input returned will be displayed.
  * The user can input just a song title to see the songs that closely match that title, but if a user is looking for a specific song and already knows the artist, better results will come from giving LIRI the artist as well. For example, "node liri spotify-this-song hello" will bring back Hello by Adele as the top result. But using "node liri spotify-this-song hello lionel richie" will bring back Hello by Lionel Richie as the top result. In the first search with just hello, Lionel Richie didn't even come back in the first five listings. Can you believe it? 
  * If the user does not input a song, the information for "The Sign" by Ace of Base will be displayed.
  * If the user does input a song but it didn't yield any results, LIRI lets the user know that no information was found.
  * Utilizes information from Spotify API.

![Spotify-this-song guide](https://github.com/edcourtney74/LIRI-Node-App/blob/master/images/spotify-this-song.gif "Spotify-this" )

### Movie Search
  * LIRI returns information for that movie, including the year it was made, the rating on IMDB, the rating on Rotten Tomatoes, the country of production, the language, the plot and the actors. 
  * If the user does not input a movie, the information for "Mr. Nobody" will be displayed.
  * If the user does input a movie but it didn't yield any results, LIRI lets the user know that no information was found.
  * Utilizes information from Online Movie Database API.

  ![Mmovie-this guide](https://github.com/edcourtney74/LIRI-Node-App/blob/master/images/movie-this.gif "Movie-this" )

### Do What It Says
  * LIRI reads the file random.txt and runs the task and input for that file. 
  * The default is currently spotify-this-song for "I Want It That Way," so LIRI will retrieve that song's information, but this can be easily changed by inserting a different option and input into random.txt.

  ![Do-what-it-says guide](https://github.com/edcourtney74/LIRI-Node-App/blob/master/images/do-what-it-says.gif "Do-what-it-says" )

### Other features
  * The user input and results are displayed in both the terminal and in a file called log.txt. Log.txt keeps track of all of LIRI's history.
  * The first letter of the user's input is capitalized for a nicer look when LIRI displays the information found.  

![Log](https://github.com/edcourtney74/LIRI-Node-App/blob/master/images/log.gif "Log" )