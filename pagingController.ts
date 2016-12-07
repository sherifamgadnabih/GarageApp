import { PagingScope } from './pagingScope'
export class pagingController {
    constructor(private $scope: PagingScope) {
        this.$scope.setCurrentPage = (page) => {
            this.$scope.$parent['currentPage'] = page;
        };

        for (var prop in this.$scope.filters) {
            this.$scope.$watch("$parent.filters['" + prop + "']", () => {
                this.CalculatePages();
            });
            this.$scope.$watch('filteredGarageData', () => {
                this.CalculatePages();
            })
        }
    }
    CalculatePages() {
        if (this.$scope.filteredGarageData) {
            var numberofPages = (this.$scope.filteredGarageData.length / this.$scope.pageSize) + ((this.$scope.filteredGarageData.length % this.$scope.pageSize) > 0 ? 1 : 0)
            this.$scope.pages = [];
            for (var i = 1; i <= numberofPages; i++) {
                this.$scope.pages.push(i);
            }
        }
    }
} 