(function () {
    'use strict';

    angular
        .module('app')
        .controller('shellController', shellController);

    shellController.$inject = ['$scope', '$rootScope', 'adalAuthenticationService', 'apiDataService'];

    function shellController($scope, $rootScope, adalService, apiDataService) {
        /* jshint validthis:true */
        

        $scope.testMessage = "";
        $scope.init = function () {
            $scope.testMessage = "";
        };

        $scope.logout = function () {
            adalService.logOut();
        };

        $scope.login = function () {
            adalService.login();
    
        };

        // optional
        $scope.$on("adal:loginSuccess", function () {
            $scope.testMessage = "loginSuccess";

           

        });

        // optional
        $scope.$on("adal:loginFailure", function () {
            $scope.testMessage = "loginFailure";
            $location.path("/login");
        });

        // optional
        $scope.$on("adal:notAuthorized", function (event, rejection, forResource) {
            $scope.testMessage = "It is not Authorized for resource:" + forResource;
        });

     


    }
})();
