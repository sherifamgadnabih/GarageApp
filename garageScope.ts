export interface GarageScope extends ng.IScope {
    levels: any[];
    filteredGarageData: any[];
    filters: any;
    data: any[];
    filterData: () => void;
    pageSize: number;
    currentPage: number;


}