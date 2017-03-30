console.log("Starting the bot");

var Twit = require('twit')
var config = require('./config')

var T = new Twit(config);

/*var params = {
	q: 'banana since:2011-07-11', 
	count: 5
};

T.get('search/tweets', params, function(err, data, response) {
	var tweets = data.statuses;
	for (var i = 0; i < tweets.length; i++)
	{
		console.log(tweets[i].text);
	}
});*/

/*
setInterval(tweetIt,1000*20);

tweetIt();

function tweetIt() {

var random = Math.floor(Math.random()*100);

T.post('statuses/update', { status: 'random number: ' + random + ' hello world!' }, function(err, data, response) {
	if (err) {
		console.log("Something went wrong");
	}
	else {
		console.log("It worked");
	}
})

}*/

/*
var stream = T.stream('user');
stream.on('follow', followed);
function followed(eventMsg) {
	var name = eventMsg.source.name;
  	var screenName = eventMsg.source.screen_name;
  	tweetIt('.@' + screenName + ' Thank you for following the bot');
}

function tweetIt(text) {

T.post('statuses/update', { status: text }, function(err, data, response) {
	if (err) {
		console.log("Something went wrong");
	}
	else {
		console.log("It worked");
	}
});

}*/


var stream = T.stream('user');
stream.on('tweet', tweetEvent);
function tweetEvent(eventMsg) {
	//var fs = require('fs');
	//var json = JSON.stringify(eventMsg, null, 2);
	//fs.writeFile("tweet.json", json);

	var replyTo = eventMsg.in_reply_to_screen_name;
	var text = eventMsg.text;
	var from = eventMsg.user.screen_name;
	if (replyTo == 'vamsitestapp') {
		newTweet = '@' + from + ' Thank you for tweeting me, boss';
		tweetIt(newTweet);
	}
}

function tweetIt(text) {
	T.post('statuses/update', { status: text }, function(err, data, response) {
	if (err) {
		console.log("Something went wrong");
	}
	else {
		console.log("It worked");
	}
	});
}