/**
 * Created by Pavle on 12/28/2015.
 */


angular.module('directives').directive('followSingleUser', function($timeout){
    return {
        restrict : 'AE',
        template: '<button class="followUser">Follow</button>',
        scope : {},
        link : function(scope, el, attrs){
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

var toggle = false;
var loginName = $('.devLogin').html();
var follow = localStorage.getItem(scope.loginName);
if(follow){
    toggle = true;
    $('.followUser').html('Unfollow');
}else{
    localStorage.removeItem(($('.devLogin').html()));
    $('.followUser').html('Follow');
}
