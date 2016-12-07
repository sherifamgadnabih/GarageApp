define(["require", "exports", './garageController', './pagingController', 'angular'], function (require, exports, garageController_1, pagingController_1, angular) {
    var app = angular.module('garageApp', []);
    app.controller("garageController", garageController_1.garageController);
    app.controller("pagingController", pagingController_1.pagingController);
    exports.default = app;
});
//# sourceMappingURL=app.js.map