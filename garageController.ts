import {garageService} from './garageService'
import {GarageScope} from './garageScope'
export  class garageController {
    constructor(private $scope: GarageScope, private $http: ng.IHttpService) {
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
          for (var prop in this.$scope.filters) {
            this.$scope.$watch("filters['" + prop + "']", () => {
                this.filterData();
            });

        })
    }
    filterData() {
        this.$scope.filteredGarageData = this.$scope.data.filter((item) => {
            return this.$scope.filters[item.Level] && this.$scope.filters[item.Type] && (item.Licencse.startsWith(this.$scope.filters['query']) || !this.$scope.filters['query']);
        });
       // this.CalculatePages();
    }

}
