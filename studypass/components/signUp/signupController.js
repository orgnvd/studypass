var signup = angular.module('studypass.signup', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/signup', {
            templateUrl: 'components/signUp/views/signup.html',
            controller: 'signupController'
        });
    }]);

signup.controller('signupController', function ($rootScope, $scope,$modalInstance,$routeParams,$location,signupService,notificationService) {

    $scope.signupObj={}

    if( $rootScope.email){
        $scope.signupObj.email=$rootScope.email;
    }
    $scope.step=1;

    $scope.cancel = function () {
        $modalInstance.close();
    }
    $scope.ok = function () {
        $modalInstance.close();
    }

    $scope.nextStep=function(){
        $scope.step++;
    }


    $scope.prevStep=function(){
        $scope.step--;
    }


    $scope.createUserAndSendOTP =function () {
        var requestObj={'user':$scope.signupObj}
        var promise = signupService.createUserAndSendOTP(requestObj)
        promise.then(function onSuccess(response) {
            if (response.status == 200) {

                if(response.data.success =true){
                    notificationService.success("OTP sent successfully")
                    $scope.step=2
                }else{
                    notificationService.error("Account already exists.Please login with email.")
                }
            } else {
                notificationService.error("Something went wrong !Please try again.")
            }
        }).catch(function onError(response) {

            if(response.status==400){
                if(response.data && response.data.reasonCode){
                    notificationService.error(response.data.reasonCode)
                }
            }else{
                notificationService.error("Something went wrong !Please try again.")
            }

        });
    }

    $scope.confirmOTP =function () {

        var promise = signupService.confirmOTP({"token":$scope.signupObj.token})
        promise.then(function onSuccess(response) {
            if (response.status == 200) {

                if(response.data && response.data.success==true){
                    notificationService.success("Signup successfully!. Please login.")
                    $scope.step=3
                }else{
                    if(response.data && response.data.reasonCode){
                        notificationService.error(response.data.reasonCode)
                    }else{
                        notificationService.error("Something went wrong !Please try again.")

                    }
                }
            }
        }).catch(function onError(response) {

           if(response.data && response.data.reasonCode){
               notificationService.error(response.data.reasonCode)
           }else{
               notificationService.error("Something went wrong !Please try again.")

           }
        });
    }


    $scope.resendOTP  = function () {
        var promise = signupService.resendOTP({"email":$scope.signupObj.email})
        promise.then(function onSuccess(response) {
            if (response.status == 200) {

                if(response.data.success =true){
                    notificationService.success("OTP sent successfully,Please verify.")
                }else{
                    notificationService.error("Account already exists.Please login with email.")
                }
            } else {
                notificationService.error("Something went wrong !Please try again.")
            }
        }).catch(function onError(response) {

            if(response.data && response.data.reasonCode){
                notificationService.error(response.data.reasonCode)
            }else{
                notificationService.error("Something went wrong !Please try again.")

            }
        });

    }




});

