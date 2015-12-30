/**
 * Created by Pavle on 12/28/2015.
 */


angular.module('directives').directive('followSingleUser', function($timeout){
    return {
        restrict : 'AE',
        template: '<button class="followUser">Follow</button>',
        scope : {},
        link : function(scope, el, attrs){
            var toggle = false;
            $timeout(function () {
                scope.loginName = $('.devLogin').html();
                scope.follow = localStorage.getItem(scope.loginName);
                if(scope.follow){
                    toggle = true;
                    $(el).find('button').html('Unfollow');
                }else{
                    localStorage.removeItem(($('.devLogin').html()));
                    $(el).find('button').html('Follow');
                }
            }, 10);

                console.log(scope);

            el.bind('click', function() {
                if(toggle === false){
                    toggle = true;
                    localStorage.setItem($('.devLogin').html(), 'true');
                    $(el).find('button').html('Unfollow');
                }else{
                    toggle = false;
                    localStorage.removeItem(($('.devLogin').html()));
                    $(el).find('button').html('Follow');
                }
            });
        }
    }
});
