(function () {
    'use strict';

    angular
        .module('app')
        .factory('dialogsService', dialogsService);

    dialogsService.$inject = ['$uibModal'];

    function dialogsService($uibModal) {

        

        var service = {
            confirm: confirm
        };

        return service;

        function confirm(message, title, buttons, templateUrl ) {

            var modalInstance = $uibModal.open({
                //animation: $scope.animationsEnabled,
                //templateUrl: 'app/shared/confirm-modal.html',
                controller: 'confirmModalController',
                templateUrl: templateUrl,


                controllerAs: 'vm',
                resolve: {
                    data: function () {
                        return {
                            title: title,
                            message: message,
                            buttons: buttons

                        };
                    }
                },
                //size: 'sm'
            });

            return modalInstance.result;
        }
    }
})();