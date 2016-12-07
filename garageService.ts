 export  class garageService {
    constructor(private $http:ng.IHttpService){

    }

    getGarageData(){
        return this.$http.get("http://localhost:3000/Garage");
    }
}
export function GarageServiceFactory($rootElement) : garageService {
    const inj = $rootElement.injector();
    return inj.instantiate(garageService);
}