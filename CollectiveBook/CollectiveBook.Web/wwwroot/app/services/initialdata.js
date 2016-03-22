angular.module('app').factory('initialData', initialData);

initialData.$inject = ['$q', 'spdataService'];

function initialData($q, spdataService) {

    var service = {
        getData: getData
    };

    return service;

    function getData(leagueId) {

        return $q.all([
            spdataService.getRoles(leagueId),
            spdataService.getCapabilities(leagueId),
            spdataService.getLocations()
        ]).then(function (results) {
            return {
                teams: results[0],
                games: results[1],
                locations: results[2]
            };
        });
    }

}