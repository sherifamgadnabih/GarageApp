define(["require", "exports"], function (require, exports) {
    var garageController = (function () {
        function garageController($scope, $http) {
            this.$scope = $scope;
            this.$http = $http;
            this.getGarageData();
            this.$scope.filterData = this.filterData;
            this.$scope.pageSize = 3;
            this.$scope.currentPage = 1;
            this.$scope.filters = {};
            this.$scope.filters = {};
            this.$scope.filters['car'] = true;
            this.$scope.filters['bike'] = true;
            this.$scope.filters['query'] = undefined;
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
                for (var prop in _this.$scope.filters) {
                    _this.$scope.$watch("filters['" + prop + "']", function () {
                        _this.filterData();
                    });
                }
            });
        };
        garageController.prototype.filterData = function () {
            var _this = this;
            this.$scope.filteredGarageData = this.$scope.data.filter(function (item) {
                return _this.$scope.filters[item.Level] && _this.$scope.filters[item.Type] && (item.Licencse.startsWith(_this.$scope.filters['query']) || !_this.$scope.filters['query']);
            });
            // this.CalculatePages();
        };
        return garageController;
    })();
    exports.garageController = garageController;
});
//# sourceMappingURL=garageController.js.map