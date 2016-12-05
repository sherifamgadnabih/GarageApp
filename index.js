var app = angular.module('garageApp', [])

app.controller('garageController', function ($scope, $http) {
    var garageData = [];
    $scope.levels = [];
    $scope.filteredGarageData = [];
    $scope.queryFilter={};
    getGarageData = function () {
        $http.get('http://localhost:3000/Garage').then(function (response) {
            $scope.filteredGarageData = response.data;
            garageData = $scope.filteredGarageData
            $scope.levels = [];
            $scope.filteredGarageData.forEach(function (item) {
                var levelsfiltered = $scope.levels.filter(function (level) {
                    return item.Level == level;
                })
                if (levelsfiltered.length == 0) {
                    $scope.levels.push(item.Level)
                    
                }

            });

            console.log($scope.levels);

        })
    }
    getGarageData();
})