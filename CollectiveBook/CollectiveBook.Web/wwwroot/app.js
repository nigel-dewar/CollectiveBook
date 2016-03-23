(function () {
    'use strict';

    angular.module('app', [
        // Angular modules 
        'ngSanitize',
        'ngAnimate',
        // 3rd Party Modules
        'AdalAngular',
        'ui.bootstrap',
        'ui.router',
        'ui.select',
        'ngCkeditor',
    ]).constant("constantService", {
        //set to false when go live
        testMode: false,

        // frontEndUrl: "http://localhost:5000/",
         frontEndUrl: "http://collectivebook.azurewebsites.net/",

        //appUrl: "https://localhost:44302/"
          appUrl: "https://api-collectivebook.azurewebsites.net/"
    }).config(config)
    //.run(['$route', 'uiSelect2Config', function ($route, uiSelect2Config) {
        .run(['$state', function ($state) {
            //$route.reload();

        }]);

    function config($stateProvider, $urlRouterProvider, adalAuthenticationServiceProvider, $httpProvider) {

        //function config($routeProvider, $httpProvider, adalAuthenticationServiceProvider) {
        //$locationProvider.html5Mode(true);

        $stateProvider
            // Get Home Page
            .state("home", {
                url: "/",
                controller: "homeController",
                controllerAs: "vm",
                templateUrl: "app/modules/home/home.html",
                requireADLogin: true
            });
            // Get My Test
            //.state("profile", {
            //    url: "/profile",
            //    controller: "profileCtrl",
            //    //controllerAs: "vm",
            //    templateUrl: "app/modules/profile/profile.html",
            //    requireADLogin: true
            //})

        

        $urlRouterProvider.otherwise('/');

        // The endpoints here are resources for cross origin requests.
        var endpoints = {
            "https://graph.microsoft.com": "https://graph.microsoft.com",
            //"https://EasternInstituteofTechnology.sharepoint.com": "https://EasternInstituteofTechnology.sharepoint.com",
            "https://api-collectivebook.azurewebsites.net": "https://technologylink.onmicrosoft.com/apicollectivebook",
            "https://localhost:44302": "https://technologylink.onmicrosoft.com/apicollectivebook",
            //"https://outlook.office.com": "https://outlook.office.com"

        };


        adalAuthenticationServiceProvider.init(
			{
			    tenant: 'technologylink.onmicrosoft.com',
			    clientId: '3e03d334-e7fb-4c3c-b195-498cddd3d11a',
			    extraQueryParameter: 'nux=1',
			    endpoints: endpoints,
			    cacheLocation: 'localStorage'
			},
			$httpProvider
			);

    };



})();