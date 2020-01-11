login.service('loginService', function ($rootScope,ConfigurationHolder,utilityService) {

    this.loginUser=function (loginRequestObj) {
        return utilityService.postHTTP(ConfigurationHolder.serverAppUrl + "/users/login", loginRequestObj)
    }

    this.getUserDetails =function (requestObj) {
        return utilityService.postHTTP(ConfigurationHolder.serverAppUrl + "/users/getUserDetails", requestObj)

    }
});
