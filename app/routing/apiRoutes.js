// LOAD DATA
// We are linking our routes to a series of "data" sources which will hold arrays of information on possible friends.
// 

var friendsData = require("../data/friends");


module.exports = function (app) {
    // API GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases when a user visits a link
    // 

    app.get("/api/friends", function (req, res) {
        console.log(friendsData);
        res.json(friendsData);

    });

    app.post("/api/friends", function (req, res) {
    

        var bestMatch = {
            name: "",
            photo: "",
            friendDifference: 1000
        };

        // Take the result of the user"s survey POST and parse it.
        var userInput = req.body;
        var userScores = userInput.scores;

        // This variable will calculate the difference between the user"s scores and the scores of
        // each user in the database
        var totalDifference = 0;

        // Here we loop through all the friend possibilities in the database.
        for (var i = 0; i < friendsData.length; i++) {

            console.log(friendsData[i].name);
            totalDifference = 0;

            // Loop through all the scores of each friend
            for (var j = 0; j < friendsData[i].scores.length; j++) {
console.log("user scores:" + userScores);
console.log("friends data:" + friendsData[i].scores);
                // Calculate the difference between the scores and sum them into the totalDifference
                totalDifference += Math.abs(parseInt(req.body.scores[j]) - parseInt(friendsData[i].scores[j]));
console.log("total difference:" + totalDifference);
console.log("best match:" + bestMatch);
                // If the sum of differences is less then the differences of the current "best match"
                if (totalDifference <= bestMatch.friendDifference) {

                    // Reset the bestMatch to be the new friend.
                    bestMatch.name = friendsData[i].name;
                    bestMatch.photo = friendsData[i].photo;
                    bestMatch.friendDifference = totalDifference;
                }
            }
        }

        // Then save the user's data to the database (this has to happen AFTER the check. otherwise,
        // the database will always return that the user is the user's best friend).
        friendsData.push(userInput);

        // Return a JSON with the user's bestMatch. This will be used by the HTML in the next page
        res.json(bestMatch);



        // console.log(friendsData);
        friendsData.push(req.body);
        // console.log(friendsData);
        console.log(req.body);
        // res.json(friendsData);
    });
};

///
// var userResults = [];


// for (var i = 0; i < friendsData.length; i++) {
//     var friendSurvey = []
// }