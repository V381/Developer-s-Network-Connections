/**
 * Created by Pavle on 12/28/2015.
 */


angular.module('directives').directive('followSingleUser', function($interval){
    return {
        restrict : 'AE',
        template: '<button class="followUser">Follow</button>',
        scope : {},
        link : function(scope, el, attrs){
            var toggle = false;
            $interval(function () {
                scope.loginName = $('.devLogin').html();
                scope.follow = localStorage.getItem(scope.loginName);
                console.log(scope);

                if(scope.follow){
                    toggle = true;
                    $(el).find('button').html('Unfollow');
                }else{
                    localStorage.removeItem(($('.devLogin').html()));
                    $(el).find('button').html('Follow');
                }
            }, 1000);


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
