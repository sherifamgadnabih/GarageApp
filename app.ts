interface GarageScope extends ng.IScope {
    levels: any[];
    filteredGarageData: any[];
    filters: any;
    data: any[];
    filterData: () => void;
    pageSize: number;
    currentPage: number;
    setCurrentPage: (page: number) => void;
    pages: number[];


}
interface pagingScope extends GarageScope {



}
class garageController {

    constructor(private $scope: GarageScope, private $http: ng.IHttpService) {
        this.getGarageData();
        this.$scope.filterData = this.filterData;
        this.$scope.setCurrentPage = (page) => {
            this.$scope.currentPage = page;
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
    getGarageData() {
        this.$http.get("http://localhost:3000/Garage").then((response) => {
            this.$scope.data = <any[]>response.data;
            this.$scope.filteredGarageData = this.$scope.data;
            this.$scope.levels = [];

            this.$scope.filteredGarageData.forEach((item) => {
                var levelsfiltered = this.$scope.levels.filter((level) => {
                    return item.Level == level;
                })
                if (levelsfiltered.length == 0) {
                    this.$scope.levels.push(item.Level)
                    this.$scope.filters[item.Level] = true;
                }
            })
            this.CalculatePages();
            for (var prop in this.$scope.filters) {
                this.$scope.$watch("filters['"+prop+"']", () => {
                    this.filterData();
                    this.CalculatePages();
                });
            }

        })
    }
    filterData() {
        this.$scope.filteredGarageData = this.$scope.data.filter((item) => {
            return this.$scope.filters[item.Level] && this.$scope.filters[item.Type] && (item.Licencse.startsWith(this.$scope.filters['query']) || !this.$scope.filters['query']);
        });
        this.CalculatePages();
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
class pagingController {

    constructor(private $scope: pagingScope) {


        // this.$scope.$watch('filteredGarageData', () => {
        //     this.CalculatePages();
        // });


    }



}
var app = angular.module('garageApp', [])
app.controller("garageController", garageController)
//app.controller("pagingController", pagingController)