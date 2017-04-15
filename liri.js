//Accessing Twitter npm
var Twitter = require('twitter');

//Accessing Spotify npm
var spotify = require('spotify');

var request = require('request');

var keys = require('./key.js');

//Take in liri command 
var operation = process.argv[2];
var song = process.argv[3];

//to read random.txt
var fs = require("fs");

var client = new Twitter (keys.twitterKeys);

function showLastTweets() {
	var params = {screen_name: 'MiraGi16'};
	client.get('statuses/user_timeline', { count: 20 } , function(err, tweets, responses) {
  		if (err) {
    		console.log(err);
    		return;
  		}
  		for (var i = 0; i < tweets.length; i++){
    		// TODO
    		console.log(JSON.stringify(tweets[i].text));
		}
	});	
};
function spotifyIt() {

	//if no song is entered, defaults to "The Sign" by Ace of Base
	if (!song) {
		song = 'the sign ace of base';
	}

	spotify.search({ type: 'track', query: song }, function(error, data) {
	    if (error) {
	        console.log('Error occurred: ' + error);
	        return;
	    }
	    else {
	    	var songInfo = data.tracks.items[0];
	    	
	    	console.log('Artist(s): ' + songInfo.artists[0].name);
	        console.log('Song Name: ' + songInfo.name);
	        console.log('Preview Link: ' + songInfo.preview_url);
	        console.log('Originating Album: ' + songInfo.album.name);
	    }
	});
};
function movieInfo() {

// Store all of the arguments in an array
var nodeArgs = process.argv;

// Create an empty variable for holding the movie name
var movieName = "";

// Loop through all the words in the node argument
// And do a little for-loop magic to handle the inclusion of "+"s
for (var i = 3; i < nodeArgs.length; i++) {

	if (i > 3 && i < nodeArgs.length) {
   		movieName = movieName + "+" + nodeArgs[i];
	}
	else {
		movieName += nodeArgs[i];
	}
}

// Then run a request to the OMDB API with the movie specified
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&r=json";

// This line is just to help us debug against the actual URL.
			console.log(queryUrl);

	request(queryUrl, function(error, response, body) {

  	// If the request is successful
  		if (!error && response.statusCode === 200) {

		    // Parse the body of the site and recover just the imdbRating
		    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
		    console.log( JSON.parse(body).Title);
		    console.log( JSON.parse(body).Year);
		    console.log( JSON.parse(body).imdbRating);
		    console.log( JSON.parse(body).Country);
		    console.log( JSON.parse(body).Language);
		    console.log( JSON.parse(body).Plot);
		    console.log( JSON.parse(body).Actors);
		    console.log( JSON.parse(body).Ratings[1]);
		    console.log( JSON.parse(body).Website);
  		}
	});
};
//reads a text file and pulls the command and input from a text file
function randomize() {
	fs.readFile("random.txt", "utf8", function(error, data) {
		var dataArr = data.split(',');

		if (dataArr[0] === 'spotify-this-song') {
			song = dataArr[1];
			spotifyIt();
		}
		else if (dataArr[0] === 'movie-this') {
			movie = dataArr[1];
			movieInfo();
		}
		else if (dataArr[0] === 'my-tweets') {
			showLastTweets();
		}
	});
}

if (operation === 'my-tweets') {
	showLastTweets();
}
else if (operation === 'spotify-this-song') {
	spotifyIt();
}
else if (operation === 'movie-this') {
	movieInfo();
}
else if (operation === 'do-what-it-says') {
	randomize();
}