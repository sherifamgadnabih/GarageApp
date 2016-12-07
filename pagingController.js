define(["require", "exports"], function (require, exports) {
    var pagingController = (function () {
        function pagingController($scope) {
            var _this = this;
            this.$scope = $scope;
            this.$scope.setCurrentPage = function (page) {
                _this.$scope.$parent['currentPage'] = page;
            };
            for (var prop in this.$scope.filters) {
                this.$scope.$watch("$parent.filters['" + prop + "']", function () {
                    _this.CalculatePages();
                });
                this.$scope.$watch('filteredGarageData', function () {
                    _this.CalculatePages();
                });
            }
        }
        pagingController.prototype.CalculatePages = function () {
            if (this.$scope.filteredGarageData) {
                var numberofPages = (this.$scope.filteredGarageData.length / this.$scope.pageSize) + ((this.$scope.filteredGarageData.length % this.$scope.pageSize) > 0 ? 1 : 0);
                this.$scope.pages = [];
                for (var i = 1; i <= numberofPages; i++) {
                    this.$scope.pages.push(i);
                }
            }
        };
        return pagingController;
    })();
    exports.pagingController = pagingController;
});
//# sourceMappingURL=pagingController.js.map