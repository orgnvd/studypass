signup.service('signupService', function ($rootScope,ConfigurationHolder,utilityService) {

    this.createUserAndSendOTP=function (requestObj) {
        return utilityService.postHTTP(ConfigurationHolder.serverAppUrl + "/users", requestObj)
    }
    this.confirmOTP=function (requestObj) {
        return utilityService.postHTTP(ConfigurationHolder.serverAppUrl + "/users/confirm", requestObj)
    }
    this.resendOTP=function (requestObj) {
        return utilityService.postHTTP(ConfigurationHolder.serverAppUrl + "/users/resend_otp", requestObj)
    }
});
