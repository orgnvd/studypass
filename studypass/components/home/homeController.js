var homeModule = angular.module('studypass.home', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/home', {
            templateUrl: 'components/home/views/homepage.html',
            controller: 'homeController'
        }).otherwise({redirectTo: '/home'});
    }]);

homeModule.controller('homeController', function ($rootScope, $scope,$location, homeService) {

    $scope.searchBarData = {}

    $scope.fetchSearchBarData = function () {
        var promise = homeService.getLocationsAndTopics()
        promise.then(function onSuccess(response) {
            if (response.status == 200) {
                $scope.searchBarData = response.data
            } else {
                console.log("error")
            }
        }).catch(function onError(response) {
            console.log("error")
        });
    }

    $scope.requestData={}

    $scope.searchResults=function () {
        homeService.setSearchFilters($scope.requestData)
        $location.path('/search')
    }


    $scope.fetchHomePageBlogsData =function () {

        var promise = homeService.getHomePageBlogData()
        promise.then(function onSuccess(response) {
            if (response.status == 200 && response.data.success) {
                $scope.homePageBlogData = response.data.blogs
            }
        }).catch(function onError(response) {
            console.log("error")
        });
    }
});

