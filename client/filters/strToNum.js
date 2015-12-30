/**
 * Created by Pavle on 12/29/2015.
 */

angular.module('myApp').filter('num', function() {
    return function(input) {
        return parseInt(input, 10);
    };
});