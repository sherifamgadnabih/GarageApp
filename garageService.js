define(["require", "exports"], function (require, exports) {
    var garageService = (function () {
        function garageService($http) {
            this.$http = $http;
        }
        garageService.prototype.getGarageData = function () {
            return this.$http.get("http://localhost:3000/Garage");
        };
        return garageService;
    })();
    exports.garageService = garageService;
    function GarageServiceFactory($rootElement) {
        var inj = $rootElement.injector();
        return inj.instantiate(garageService);
    }
    exports.GarageServiceFactory = GarageServiceFactory;
});
//# sourceMappingURL=garageService.js.map