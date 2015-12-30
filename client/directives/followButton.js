/**
 * Created by Pavle on 12/25/2015.
 */


angular.module('directives').directive('follow', function($timeout){
    return {
        restrict : 'AE',
        template: '<button class="follow">Follow</button>',
        scope : {},
        link : function(scope, el, attrs){
            var toggle = false;

            scope.follow = localStorage.getItem(scope.$parent.i.login);
            if(scope.follow){
                toggle = true;
                $(el).find('button').html('Unfollow');
            }else{
                localStorage.removeItem(scope.$parent.i.login);
                $(el).find('button').html('Follow');
            }

            el.bind('click', function() {
                if(toggle === false){
                    toggle = true;
                    localStorage.setItem(scope.$parent.i.login, 'true');
                    $(el).find('button').html('Unfollow');
                }else{
                    toggle = false;
                    localStorage.removeItem(scope.$parent.i.login);
                    $(el).find('button').html('Follow');
                }

            }.bind(this));

        }
    }
});