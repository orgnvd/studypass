var login = angular.module('studypass.login', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'components/login/views/login.html',
            controller: 'loginController'
        });
    }]);

login.controller('loginController', function ($rootScope, $scope,$modalInstance,$routeParams,$location,loginService,notificationService,localStorageService) {
    $scope.loginObject={}

    $scope.cancel = function () {
        $modalInstance.close();
    }
    $scope.ok = function () {
        $modalInstance.close();
    }

    $scope.loginUser =function () {
        var promise = loginService.loginUser($scope.loginObject)
        promise.then(function onSuccess(response) {
            if (response.status == 200) {
                if (response.data.success) {
                    localStorageService.set('auth-token', response.data.auth_token)
                    notificationService.success("login success.")
                    $scope.ok();
                    $rootScope.getUserDetails();
                } else {
                    notificationService.error(response.data.reasonCode);
                    $rootScope.email=$scope.loginObject.email;
                    $scope.openVerifyModal();
                }
            }else{
                notificationService.error("Invalid Credentials.")
            }

        }).catch(function onError(response) {
            notificationService.error("Invalid Credentials.")
        });
    }


});

