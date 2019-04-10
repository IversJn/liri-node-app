require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var fs = require("fs");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var choice = process.argv[2];
var input = process.argv.slice(3).join(" ");
var divide = "\n------------------------------\n";

//Function for concert-this
function concert() {
    if (!input) {
        input = "Foo Fighters";
    }
    console.log(divide);
    var queryUrl = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp";

    axios.get(queryUrl).then(
        function (response) {
            var loc = response.data[0].venue;
            console.log("Venue Name: " + loc.name);
            console.log("Venue Location: " + loc.city + ", " + loc.country);
            console.log("Date of Event: " + response.data[0].datetime);
            console.log(divide);
        })
        .catch(function (err) {
            console.log(err);
        });
}

//Function for spotify-this-song
function listen() {
    console.log(input);
    if (!input) {
        input = "The Sign";
    }
    spotify
        .search({ type: 'track', query: input })
        .then(function (response) {
            var spotSearch = response.tracks;
            console.log(divide);
            console.log("Artist(s): " + spotSearch.items[0].artists[0].name);
            console.log("Song: " + spotSearch.items[0].name);
            console.log("Preview: " + spotSearch.items[0].preview_url);
            console.log("Album: " + spotSearch.items[0].album.name);
            console.log(divide);
        })
        .catch(function (err) {
            console.log(err);
        });
}

//Function for movie-this
function movie() {
    if (!input) {
        input = "Mr Nobody";
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy";

    axios.get(queryUrl).then(
        function (response) {
            var details = response.data
            console.log(divide);
            console.log("Title: " + details.Title);
            console.log("Release Year: " + details.Year);
            console.log("Imdb Rating: " + details.imdbRating);
            console.log("Rotten Tomatoes Rating: " + details.Ratings[1].Value);
            console.log("Country of Production: " + details.Country);
            console.log("Country of Production: " + details.Language);
            console.log("Country of Production: " + details.Plot);
            console.log("Country of Production: " + details.Actors);
            console.log(divide);
        }
    );
}

//Function for do-what-it-says
function doWhat() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        input = data;
        listen();
    });
}

//Switch statement for picking up input
switch (choice) {
    case "concert-this":
        concert()
        break;
    case "spotify-this-song":
        listen()
        break;
    case "movie-this":
        movie()
        break;
    case "do-what-it-says":
        doWhat()
        break;
}

//Menu That I was working on outside assingment
// choices();
// var inquirer = require("inquirer");
// function choices() {
//     inquirer.prompt([
//         {
//             type: "list",
//             name: "select",
//             message: "Select a command",
//             choices: ["concert-this", "spotify-this-song", "movie-this", "do-what-it-says"]
//         }

//     ]).then(function (choice) {
//         switch (choice.select) {
//             case "concert-this":
//                 concert()
//                 break;
//             case "spotify-this-song":
//                 spotify()
//                 break;
//             case "movie-this":
//                 movie()
//                 break;
//             case "do-what-it-says":
//                 doWhat()
//                 break;
//         }
//     });
// }