import { GarageScope } from './garageScope'

export interface PagingScope extends GarageScope {
    setCurrentPage: (page: number) => void;
    pages: number[];


}