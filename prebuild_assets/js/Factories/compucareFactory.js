app.factory('compucareFactory', ['$http', function($http) {
    return {
        getAvailableSlotsForClinicianAtSiteByMonth : function(clinicianId, siteId, month) {
            return $http ({
                method: 'GET',
                url: '',
                cache: false
            })
        }
    };
}]);