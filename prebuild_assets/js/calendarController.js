app.controller('CalendarController', ['$scope', 'moment', function($scope, moment) {
    $scope.init = function() {
        var today = moment(new Date());
        $scope.today = today;
        $scope.daysArray = calendarCreate(today);
        // $scope.month = today.format('M');
        // $scope.day   = today.format('D');
        // $scope.year  = today.format('YYYY');
    };

    function calendarCreate(month) {
        var firstDay = moment(month).startOf('M');

        var days = Array.apply(null, { length: month.daysInMonth() })
                        .map(Number.call, Number)
                        .map(n => {
                          return moment(firstDay).add(n, 'd');
                        });
                        
        for (let n = 0; n < firstDay.weekday(); n++) {
            days.unshift(null);
        }
        
        return days;
    };

    function nextMonth() {
        $scope.date.add(1, 'M');
        $scope.daysArr = this.createCalendar(this.date);
    }
    
    function previousMonth() {
        $scope.date.subtract(1, 'M');
        $scope.daysArr = this.createCalendar(this.date);
    }
  }]);