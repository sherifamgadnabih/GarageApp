var garageController = (function () {
    function garageController($scope, $http) {
        var _this = this;
        this.$scope = $scope;
        this.$http = $http;
        this.getGarageData();
        this.$scope.filterData = this.filterData;
        this.$scope.setCurrentPage = function (page) {
            _this.$scope.currentPage = page;
        };
        this.$scope.filters = {};
        this.$scope.filters = {};
        this.$scope.filters['car'] = true;
        this.$scope.filters['bike'] = true;
        this.$scope.filters['query'] = undefined;
        this.$scope.pageSize = 3;
        this.$scope.currentPage = 1;
        this.$scope.data = [];
    }
    garageController.prototype.getGarageData = function () {
        var _this = this;
        this.$http.get("http://localhost:3000/Garage").then(function (response) {
            _this.$scope.data = response.data;
            _this.$scope.filteredGarageData = _this.$scope.data;
            _this.$scope.levels = [];
            _this.$scope.filteredGarageData.forEach(function (item) {
                var levelsfiltered = _this.$scope.levels.filter(function (level) {
                    return item.Level == level;
                });
                if (levelsfiltered.length == 0) {
                    _this.$scope.levels.push(item.Level);
                    _this.$scope.filters[item.Level] = true;
                }
            });
            _this.CalculatePages();
            for (var prop in _this.$scope.filters) {
                _this.$scope.$watch("filters['" + prop + "']", function () {
                    _this.filterData();
                    _this.CalculatePages();
                });
            }
        });
    };
    garageController.prototype.filterData = function () {
        var _this = this;
        this.$scope.filteredGarageData = this.$scope.data.filter(function (item) {
            return _this.$scope.filters[item.Level] && _this.$scope.filters[item.Type] && (item.Licencse.startsWith(_this.$scope.filters['query']) || !_this.$scope.filters['query']);
        });
        this.CalculatePages();
    };
    garageController.prototype.CalculatePages = function () {
        if (this.$scope.filteredGarageData) {
            var numberofPages = (this.$scope.filteredGarageData.length / this.$scope.pageSize) + ((this.$scope.filteredGarageData.length % this.$scope.pageSize) > 0 ? 1 : 0);
            this.$scope.pages = [];
            for (var i = 1; i <= numberofPages; i++) {
                this.$scope.pages.push(i);
            }
        }
    };
    return garageController;
})();
var pagingController = (function () {
    function pagingController($scope) {
        // this.$scope.$watch('filteredGarageData', () => {
        //     this.CalculatePages();
        // });
        this.$scope = $scope;
    }
    return pagingController;
})();
var app = angular.module('garageApp', []);
app.controller("garageController", garageController);
//app.controller("pagingController", pagingController) 
//# sourceMappingURL=app.js.map