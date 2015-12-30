/**
 * Created by Pavle on 12/25/2015.
 */


// Converts 5000 to 5k

angular.module('filters').filter("nrFormat", function() {
    return function(number) {
        var abs;
        if (number !== void 0) {
            abs = Math.abs(number);
            if (abs >= Math.pow(10, 12)) {
                number = (number / Math.pow(10, 12)).toFixed(1) + "t";
            } else if (abs < Math.pow(10, 12) && abs >= Math.pow(10, 9)) {
                number = (number / Math.pow(10, 9)).toFixed(1) + "b";
            } else if (abs < Math.pow(10, 9) && abs >= Math.pow(10, 6)) {
                number = (number / Math.pow(10, 6)).toFixed(1) + "m";
            } else if (abs < Math.pow(10, 6) && abs >= Math.pow(10, 3)) {
                number = (number / Math.pow(10, 3)).toFixed(1) + "k";
            }
            return number;
        }
    };
});