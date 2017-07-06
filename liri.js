var keys = require("./keys.js");
var fs = require("fs");
var twitter = require("twitter");
var request = require("request");
var spotify = require("spotify");
var spotifyWebApi = require("spotify-web-api-node");
var nodeArgs = process.argv;
var argument = process.argv[2];

var userInput = process.argv[3];

argumentChoice();

//twitter logic
function myTweets() {

    var client = new twitter({
        consumer_key: keys.twitterKeys.consumer_key,
        consumer_secret: keys.twitterKeys.consumer_secret,
        access_token_key: keys.twitterKeys.access_token_key,
        access_token_secret: keys.twitterKeys.access_token_secret,
    });

    var params = {
        HWWeek10: 'nodejs',
        Count: 20
    };

    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                console.log(tweets[i].created_at + "" + tweets[i].text);
            }
        }

    });

}


//OMDB logic

function movieThis() {
    var movieName = userInput;

    if (!movieName) {
        movieName = "mr nobody";
    }

    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&r=json&tomatoes=true&apikey=40e9cece";

    console.log(queryUrl);

    request(queryUrl, function(error, response, body) {

        if (!error && response.statusCode === 200) {
            var movieData = JSON.parse(body);
            //console.log(movieData);

            console.log("Title: " + movieData.Title);
            console.log("Release Year: " + movieData.Year);
            console.log("IMDB Rating: " + movieData.imdbRating);
            console.log("Country: " + movieData.Country);
            console.log("Language: " + movieData.Language);
            console.log("Plot: " + movieData.Plot);
            console.log("Actors: " + movieData.Actors);
            console.log("Rotten Tomatoes URL: " + movieData.tomatoURL);

        } else {
            console.log("error");
        }

    })

};



//Spotify logic

function spotifyThisSong() {
	var music = userInput
	if (!music) {
		music = "the sign"
	}

    var spotifyApi = new spotifyWebApi({
        clientId: "fcecfc72172e4cd267473117a17cbd4d",
        clientSecret: "a6338157c9bb5ac9c71924cb2940e1a7",
        redirectUri: "http://www.example.com/callback"
    });

    spotifyApi.getArtistAlbums("43ZHCT0cAZBISjO8DG9PnE")
        .then(function(data) {
            console.log("Artist albums", data.body);
        }, function(error) {
            console.error(error);
        });
}




//do-what-it-says
function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function(error, data) {

        console.log(data);

    });

}

//append log.txt 
// fs.appendFile("log.txt", JSON.stringify(data), function(err) {

//   if (err) {
//     return console.log(err);
//   }

//   console.log("log.txt was updated");

// });

// my-tweets
// spotify-this-song
// movie-this
// do-what-it-says

function argumentChoice() {

    if (argument === "my-tweets") {
        myTweets();
    };

    if (argument === "spotify-this-song") {
        spotifyThisSong();
    };

    if (argument === "movie-this") {
        movieThis();


    };

    if (argument === "do-what-it-says") {
        doWhatItSays();

    };



}
