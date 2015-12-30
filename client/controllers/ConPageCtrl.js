/**
 * Created by Pavle on 12/25/2015.
 */

angular.module("controllers").controller("mainCtrl", function($scope, $http, dataProvider){
    $scope.parseInt = parseInt;
    $scope.searchByName = '';
    dataProvider.fetchDevelopers('/api/user').then(function(result) {

        $scope.allDevs = result.data;


        $scope.allDevs.forEach(function(val) {
            if(typeof (val.following || val.followers || val.public_repos) === 'string'){
               val.following = Number(val.following);
               val.followers = Number(val.followers);
               val.public_repos = Number(val.public_repos);
               val.public_gists = Number(val.public_gists);
            }
        });

        $scope.searchByName = result.data.name;


        $scope.numOfFollz = function () {
            $scope.numOfFoll = 'followers';
            $scope.numOfRep = "";
            $scope.updated_at = "";
        };

        $scope.pubRepos = function () {
            $scope.numOfRep = 'public_repos';
            $scope.updated_at = "";
        };

        $scope.updatedAt = function () {
            $scope.numOfFoll = "";
            $scope.numOfRep = "";
            $scope.updated_at = 'updated_at';
        };

        $scope.defaultOrder = function () {
            $scope.numOfFoll = "";
            $scope.numOfRep = "";
            $scope.updated_at = '';
        }

    });

});