(function () {
    'use strict';

    angular
        .module('app')
        .controller('confirmModalController', confirmModalController);

    confirmModalController.$inject = ['$uibModalInstance', 'data'];

    function confirmModalController($uibModalInstance, data) {
        /* jshint validthis:true */
        var vm = this;

        vm.ok = ok;
        vm.cancel = cancel;
        
        vm.properties = data;
 
        function ok (item) {
            $uibModalInstance.close(item);
        };

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        };

   
    }
})();
