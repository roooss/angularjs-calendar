var app = angular.module('calendarBooking', ['angularMoment']);
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
app.controller('CalendarController', ['$scope', 'moment', function($scope, moment) {
    $scope.isReserved = null;
    $scope.daysArray = [];
    $scope.showCalendarSpinner = true;
    $scope.showTimesSpinner = true;

    $scope.init = function() {
        var today = moment(new Date());
        $scope.date = today;
        $scope.daysArray = calendarCreate(today);
        
        $scope.clinicianId = 59;
        $scope.hospitalId = 1;

        $scope.showCalendarSpinner = false;
    };
    
    $scope.nextMonth = function () {
        $scope.date.add(1, 'M');
        $scope.daysArray = calendarCreate($scope.date);
    };
    
    $scope.previousMonth = function () {
        $scope.date.subtract(1, 'M');
        $scope.daysArray = calendarCreate($scope.date);
    };

    $scope.todayCheck = function (day) {
        if (!day) {
            return false;
        }
        
        return moment().format('L') === day.date.format('L');
    };
    
    $scope.isSelected = function (day) {
        if (!day) {
            return false;
        }
        
        return false;
        // var dateFromMoment = moment(this.dateForm.value.dateFrom, 'MM/DD/YYYY');
        // var dateToMoment = moment(this.dateForm.value.dateTo, 'MM/DD/YYYY');
        // if (this.dateForm.valid) {
            //   return (
                //     dateFromMoment.isSameOrBefore(day) && dateToMoment.isSameOrAfter(day)
                //   );
        // }
        // if (this.dateForm.get('dateFrom').valid) {
            //   return dateFromMoment.isSame(day);
        // }
    };

    $scope.reserve = function () {
        var dateFromMoment = this.dateForm.value.dateFrom;
        var dateToMoment = this.dateForm.value.dateTo;
        $scope.isReserved = `Reserved from ${dateFromMoment} to ${dateToMoment}`;
    }
    
    $scope.selectDate = function (day) {
        var dayFormatted = day.date.format('MM/DD/YYYY');
        
        // Unset all other dates
        $scope.daysArray.forEach(function(day) {
            if (day) {
                day.isSelected = false;
            }
        });
        
        // Set Selected date
        day.isSelected = true;

        // Acquire Times for date
    };

    function calendarCreate(month) {
        var firstDay = moment(month).startOf('M');
            
        var days = Array.apply(null, { length: month.daysInMonth() })
                        .map(Number.call, Number)
                        .map(n => {
                            return { 
                                date: moment(firstDay).add(n, 'd'),
                                isSelected: false,
                                isAvailable: true
                            };
                        });
                                    
        for (let n = 0; n < firstDay.weekday(); n++) {
            days.unshift(null);
        }

        console.log(days);
        return days;
    };
}]);