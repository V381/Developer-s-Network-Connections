/**
 * Created by Pavle on 12/25/2015.
 */

angular.module("controllers").controller("detailsCtrl", function($scope, $http, dataProvider, $resource, $routeParams){

    var url = window.location.pathname;
    var id = url.substring(url.lastIndexOf('/') + 1);
    $scope.id = id;
    $scope.directFriends = {};
    $scope.locations = {};
    $scope.mutualLocation = {};
    $scope.friendsOfFriends = {};
    $scope.suggestedFriend = [];
    $scope.randomFriendOfFriends = [];
    $scope.rndsFriends = [];

    var devInfo = $resource('/api/user/:id/info', {id : '@id'});

    devInfo.get({ id: id}, function(data) {
        $scope.info = data;
        dataProvider.fetchDevelopers('/api/user/').then(function (devs) {


            devs.data.forEach(function(val) {

                // Same Location data structure

                if(val.location === null){
                    val.location = "";
                }

                $scope.locations[val.id] =  val.location.city;

                // Direct friends algo:

                data.followingList.forEach(function(innerVal) {
                    if(val.id === innerVal){
                        $scope.directFriends[val.id] = val;
                    }
                });

                // Same Location Algo:

                for(var i in $scope.locations){

                    if(Number(val.id) === Number(i)){
                        $scope.mutualLocation[val.login] = {
                            location : $scope.locations[i],
                            id : val.id,
                            login : val.login,
                            name : val.name
                        }
                    }

                }

                // Friends Of Friends Friends Algo:

                for(var j in $scope.directFriends){
                    $scope.directFriends[j].followingList.forEach(function(innerVal) {
                        if(Number(val.id) === Number(innerVal)){
                            $scope.friendsOfFriends[innerVal] = {
                                name : val.name,
                                id : val.id
                            }
                        }
                    });
                }

            });

            // Friends Of Friends Algo continued:
            for(var i in $scope.directFriends){
                for(var j in $scope.friendsOfFriends){
                    if(i === j){
                        $scope.friendsOfFriends[j] = false;
                    }
                }
            }

            // Suggested friend algo

            for(var z in $scope.friendsOfFriends){
                if($scope.friendsOfFriends[z] != false){
                    $scope.randomFriendOfFriends.push($scope.friendsOfFriends[z]);
                }
            }

            $scope.arr = [];

            $scope.suggestedFriend = $scope.randomFriendOfFriends[Math.floor(Math.random() * $scope.randomFriendOfFriends.length)];
            $scope.suggestedFriend = $scope.randomFriendOfFriends[Math.floor(Math.random() * $scope.randomFriendOfFriends.length)];
            $scope.rndsFriends.push(
                $scope.randomFriendOfFriends[Math.floor(Math.random() * $scope.randomFriendOfFriends.length)],
                $scope.randomFriendOfFriends[Math.floor(Math.random() * $scope.randomFriendOfFriends.length)]

            );

            $scope.rndsFriends = _.uniq($scope.rndsFriends);

            // Clear falsy values from object
            $scope.locations = _.pick($scope.locations, _.identity);
            $scope.mutualLocation = _.pick($scope.mutualLocation, _.identity);
            console.log($scope.mutualLocation);


        });
    });


});