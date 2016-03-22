(function() {
    'use strict';

    angular
        .module('app')
        .directive('replyDirective', function(){
        
            return {
                templateUrl: "app/modules/wall/reply-directive.html",
                restrict: "EA",
                controller: function ($scope, apiDataService, $q, $rootScope) {


                }
            }
        
        });

})();