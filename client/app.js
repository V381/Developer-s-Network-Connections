/**
 * Created by Pavle on 12/25/2015.
 */


var app = angular.module('myApp', ['ngRoute', 'ngResource', 'directives', 'services', 'controllers', 'filters']);

app.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/api/user/:id', {
                templateUrl: 'views/details.html',
                controller: 'detailsCtrl'
            }).
            otherwise({
                redirectTo: ''
            });
    }]);