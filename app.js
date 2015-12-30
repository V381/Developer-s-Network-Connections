/**
 * Created by Pavle on 12/25/2015.
 */



var express = require('express');
var fs = require('fs');
var path = require('path');
var app = express();
var userData;

app.use(express.static(__dirname));

fs.readFile('data/staticUsers.json', function (err, data) {
    userData = JSON.parse(data);
});

app.set('port', process.env.PORT || 8080);

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/client/' + 'index.html'));
});

app.get('/api/user/', function(req, res) {
    res.json(userData);
});

app.get('/api/user/:id/', function(req, res) {
    userData.forEach(function(val) {
        if(Number(val.id) === Number(req.params.id)){
            res.sendFile(path.join(__dirname + '/client/views/' + 'details.html'));
        }
    });
});

app.get('/api/user/:id/info', function(req, res) {
    userData.forEach(function(val) {
        if(Number(val.id) === Number(req.params.id)){
            res.json(val);
        }
    });
});

var directFriends = {};
var friendsOfFriends = {};


app.get('/api/user/:id/direct-friends', function(req, res) {
    directFriends = {};
    userData.forEach(function(val){
        val.followingList.forEach(function(innerVal) {
            if(Number(req.params.id) === Number(innerVal)){
                directFriends[val.id] = val.name;
            }
        });
    });
    res.json(directFriends);

});


app.get('/api/user/:id/friends-of-friends', function(req, res){
    //friendsOfFriends = {};
    //directFriends = {};
    //
    //userData.forEach(function(val) {
    //
    //    val.followingList.forEach(function(innerVal) {
    //        if(Number(req.params.id) === Number(innerVal)){
    //            directFriends[val.id] = {
    //                name : val.name,
    //                followingList : val.followingList
    //            }
    //        }
    //    });
    //
    //    for(var j in directFriends){
    //        directFriends[j].followingList.forEach(function(innerVal) {
    //            if(Number(val.id) === Number(innerVal)){
    //                friendsOfFriends[innerVal] = {
    //                    name : val.name,
    //                    id : val.id
    //                }
    //            }
    //        });
    //    }
    //
    //});
    //
    //for(var i in directFriends){
    //    for(var j in friendsOfFriends){
    //        if(i === j){
    //            friendsOfFriends[j] = false;
    //        }
    //    }
    //}
    //
    //res.json(friendsOfFriends)
    res.send('Hello World');
});

app.get('/api/user/:id/suggested-friends', function(req, res) {
    res.send('Hello World');
});


app.get('/api/user/:id/:param', function(req, res) {
    userData.forEach(function(val) {
        if(Number(val.id) === Number(req.params.id)){
            for(var i in val){
                if(val.hasOwnProperty(i)){
                    if(String(i) === String(req.params.param)){
                        res.json(val[i]);
                    }
                }
            }
        }
    });
});



app.use(function(req, res, next) {
    res.status(404).send('Sorry, user or address not found...');
});


app.listen(app.get('port'));


