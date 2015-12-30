/**
 * Created by Pavle on 12/25/2015.
 */

angular.module("services").factory("dataProvider", ['$http', function ($http, $resource){

    // Private

    // Public

    return {

        fetchDevelopers: function (address) {
            return $http.get(address);
        }

    }
}]);
