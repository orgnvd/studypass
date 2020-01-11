angular.module("studypass",
    [
        /*custom modules start here*/
        'appConfig',
        'studypass.utils',
        'studypass.home',
        'studypass.login',
        'studypass.signup',
        'studypass.search',
        'studypass.institute',
        /*custom modules ends here*/

        /*bower modules starts here*/
        'LocalStorageModule',
        'ui.select',
        'ui.bootstrap',
        'jlareau.pnotify'
        /*bower modules ends here*/


    ]).config(function ($locationProvider) {
    $locationProvider.hashPrefix('');
}).run(function ($rootScope,ConfigurationHolder,localStorageService,loginService,notificationService) {

    $rootScope.isLoggedInUser =!!(localStorageService.get('auth-token'))
    $rootScope.user= localStorageService.get("userDetails")

    /*on each login/page refresh , getUserDetails*/
    $rootScope.getUserDetails  = function () {
        if(!localStorageService.get('auth-token')){
            //return if no token exists
            $rootScope.user =null
            $rootScope.isLoggedInUser=false
            return
        }
        var promise = loginService.getUserDetails({})
        promise.then(function onSuccess(response) {
            if (response.status == 200 && response.data.success) {
                if(response.data.reasonCode){
                    notificationService.error(response.data.reasonCode);
                    $rootScope.user={}
                }else{
                    $rootScope.user =response.data
                }
                $rootScope.isLoggedInUser=true
                localStorageService.set("userDetails",response.data)
            } else {
               $rootScope.removeUserDetailsFromSession();
            }
        }).catch(function onError(response) {
            if(response.status==401){
                notificationService.error("Unauthorized ! Please login again")
                $rootScope.removeUserDetailsFromSession();
            }else{
                notificationService.error("Get User details failed ! Please try again")
            }
        });
    }

    $rootScope.removeUserDetailsFromSession = function () {
        localStorageService.remove('userDetails');
        localStorageService.remove('auth-token')
        $rootScope.isLoggedInUser=false
        $rootScope.user=null
    }

}).controller("AppCtrl", function ($rootScope,$scope,$modal,notificationService) {
    //app lvl here

    $scope.openLoginModal = function(){

        var modalInstance = $modal.open({
            templateUrl: 'components/login/views/login.html',
            controller: 'loginController',
            scope : $scope,
            size: 'sm',
            resolve:{}
        });
    }

    $rootScope.getUserDetails();

    $scope.openSignupModal = function(){
        var modalInstance = $modal.open({
            templateUrl: 'components/signUp/views/signup.html',
            controller: 'signupController',
            scope : $scope,
            size: 'sm',
            resolve:{}
        });
    }

    $scope.openVerifyModal = function(){
        var modalInstance = $modal.open({
            templateUrl: 'components/signUp/views/verifyPopup.html',
            controller: 'signupController',
            scope : $scope,
            size: 'sm',
            resolve:{}
        });
    }

    $scope.logoutUser = function () {
        $rootScope.removeUserDetailsFromSession();
        notificationService.success("Logout success!")
        return;

        //todo logout from server as well
        var promise = //todo ekhan add logout api here//loginService.loginUser($scope.loginObject)
            promise.then(function onSuccess(response) {
                if (response.status == 200 && response.data.success) {
                    $rootScope.removeUserDetailsFromSession();
                } else {
                    notificationService.error("Something went wrong !Please try again.")
                }
            }).catch(function onError(response) {
                console.log("error")
                notificationService.error("Something went wrong !Please try again.")
            });

    }

});