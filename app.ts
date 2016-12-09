import {garageController} from './garageController'
import {pagingController} from './pagingController'
import  * as angular  from 'angular'
var app = angular.module('garageApp', [])
app.controller("garageController",  garageController)
app.controller("pagingController",  pagingController)
export default app;