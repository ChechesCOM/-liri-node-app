require("dotenv").config();
var keys = require('./keys.js');
var Twitter = require('twitter');
var spotify = require('spotify');
//var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');
//var action = process.argv[2];
var arg = "";

arg = process.argv[3];

parseCommand(process.argv[2], arg);

function parseCommand(command, arg) {
    switch (command) {

        case "my-tweets":
            getTweets();
            break;

        case "spotify-this-song":
            spotifySong(arg);
            break;

        case "movie-this":
            movieInfo(arg);
            break;

        case "do-what-it-says":
            parseFileCommand();
            break;

        case undefined:
        case "":
            console.log("I couldn't quite hear. Try talking a bit louder.");
            break;

        default:
            console.log(" Are you sure that was a valid command?");
            break;

    }
};

function getTweets() {
    console.log("Please wait while I find your tweets.\n");
    var twitter = new Twitter(keys.twitterKeys);
    twitter.get('statuses/home_timeline', function (error, tweets, response) {
        if (tweets.length < 1) {
            console.log("I couldn't find any tweets.");
            return;
        }
        if (tweets.length === 1) {
            console.log("Here is your only tweet:\n");
        } else {
            console.log("Here are your " + tweets.length + " most recent tweets:\n");
        }
    });
}

if(argument === "spotify-this-song"){
    var songTitle = process.argv[3];
    spotify.search({ type: 'track', query: songTitle }, function(err, data){
        
        if(process.argv[3]){
            var data = data.tracks.items;
            for(var i =0; i < data.length; i++){
                
                console.log(data[i].name); //song track name
                console.log(data[i].album.href); //url 
                console.log(data[i].album.name); //album name
                console.log(data[i].preview_url); //preview link to the song
            
                for(var a =0; a < data[i].artists.length; a++){
                    console.log(data[i].artists[a].name); //artist's name
                }
            }
        }else{
            spotify.search({ type: 'track', query: "what's my age again"}, function(err, data){
                var data = data.tracks.items;
                console.log(data[0].name); //song track name
                console.log(data[0].album.href); //url 
                console.log(data[0].album.name); //album name
                console.log(data[0].preview_url); //preview link to the song
                console.log(data[0].artists[0].name); //artist's name
            });
        }
    });
    outputText();
}

function movieInfo(movie) {
    movie = movie || "Mr. Nobody";
    var queryUrl = "https://www.omdbapi.com/?apikey=trilogy=" + movie; // using search because sometimes just getting a movie by name gives strange results
    console.log("Please wait while I find that movie.\n");
    request(queryUrl, function (error, response, body) {
        if (error) {
            console.log("I'm sorry, but I seem to have run into an error.\n  " + error);
            return;
        }
    });
}