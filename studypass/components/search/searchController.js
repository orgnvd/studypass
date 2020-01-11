var search = angular.module('studypass.search', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/search', {
            templateUrl: 'components/search/views/searchPage.html',
            controller: 'searchController'
        });
    }]);

search.controller('searchController', function ($rootScope, $scope,$routeParams,$location,searchService,homeService,instituteService) {

    function initSearchFilters() {
        $scope.searchResultsError=false;
        $scope.requestData=homeService.getSearchFilters();
        $scope.requestData.topic_ids=[]
        $scope.requestData.startDate=null
        $scope.requestData.endDate=null
        $scope.requestData.location_ids=[]
        $scope.requestData.exams=[]
        $scope.requestData.time_slot=[]
    }

    initSearchFilters();


    
    $scope.toggleSubLocations =function (sub_location_Id) {
            var idx = $scope.requestData.location_ids.indexOf(sub_location_Id);
            if (idx > -1) {
                $scope.requestData.location_ids.splice(idx, 1);
            } else {
                $scope.requestData.location_ids.push(sub_location_Id);
            }
        $scope.doSearch();
    }

    $scope.applyDateSearch=function(){
        if( $scope.requestData.startDate!=undefined ||  $scope.requestData.endDate!=undefined ){
            $scope.doSearch();
        }//else date format is incorrect
    }

    $scope.toggleSubTopics =function (sub_topic_Id) {
        var idx = $scope.requestData.topic_ids.indexOf(sub_topic_Id);
        if (idx > -1) {
            $scope.requestData.topic_ids.splice(idx, 1);
        } else {
            $scope.requestData.topic_ids.push(sub_topic_Id);
        }
        $scope.doSearch();
    }
    
    $scope.toggleExamTypes =function (exam) {
        var idx =  $scope.requestData.exams.indexOf(exam);
        if (idx > -1) {
            $scope.requestData.exams.splice(idx, 1);
        } else {
            $scope.requestData.exams.push(exam);
        }
        $scope.doSearch();
    }
    
    $scope.toggleTimeSlot =function (timeSlot) {
        var idx =  $scope.requestData.time_slot.indexOf(timeSlot);
        if (idx > -1) {
            $scope.requestData.time_slot.splice(idx, 1);
        } else {
            $scope.requestData.time_slot.push(timeSlot);
        }
        $scope.doSearch();
        
    }

    $scope.selectTopic=function (subject_id) {
        if( $scope.requestData.topicId==subject_id){
            return
        }
        $scope.requestData.topic_ids=[]
        $scope.requestData.topicId=subject_id

        $scope.doSearch();
    }

    $scope.selectCity=function(city_id){
        if( $scope.requestData.locationId==city_id){
            return
        }
        $scope.requestData.location_ids=[]
        $scope.requestData.locationId=city_id

        $scope.doSearch();
    }

    $scope.searchBarData = {}

    $scope.fetchSearchBarData = function () {
        var promise = homeService.getLocationsAndTopics()
        promise.then(function onSuccess(response) {
            if (response.status == 200) {
                $scope.searchBarData = response.data
                $scope.applyDefaultFilters()
                $scope.searchResults();
            } else {
                console.log("error")
            }
        }).catch(function onError(response) {
            console.log("error")
        });
    }

    $scope.applyDefaultFilters =function (isResetFlow) {
        if(!$scope.requestData.locationId || isResetFlow){
            $scope.requestData.locationId = $scope.searchBarData.locations[0].id
        }
        if(!$scope.requestData.topicId || isResetFlow){
            $scope.requestData.topicId = $scope.searchBarData.topics[0].id
        }
    }


    $scope.fetchSearchPageData=function () {
        $scope.searchResultsError=false;
        var requestObj =searchService.prepareSearchQuery($scope.requestData)
        console.log(requestObj);
        var promise = searchService.fetchSearchResults(requestObj)
        promise.then(function onSuccess(response) {
            if (response.status == 200) {
                $scope.searchPageData = searchService.prepareSearchPageDisplayData(response.data)
                $scope.all_filters=searchService.prepareAllFiltersData(response.data)
                $scope.selected_filters=searchService.prepareSelectedFilterData(response.data)
            } else {
                $scope.searchResultsError=true;
            }
        }).catch(function onError(response) {
            $scope.searchResultsError=true;
        });
    }


    $scope.viewInstituteDetails=function (instituteId) {

        instituteService.setAppliedFilters($scope.requestData);

        if(!instituteId){
            return
        }
        $location.path("/institute/"+instituteId)
    }

    $scope.resetFilters=function(){

        $scope.requestData={}
        initSearchFilters();
        $scope.applyDefaultFilters(true)
        $scope.searchResults();
    }

    $scope.doSearch =function(){
        $scope.fetchSearchPageData()
    }


    $scope.searchResults=function () {
        homeService.setSearchFilters($scope.requestData)
        $scope.fetchSearchPageData();
    }


    $scope.removeSelectedFilter =function (id,filterType) {

        if(filterType=='examFilter'){
            var idx =  $scope.requestData.exams.indexOf(id);
            if (idx > -1) {
                $scope.requestData.exams.splice(idx, 1);
            }
        }
        if(filterType=='subTopicFilter'){
            var idx =  $scope.requestData.topic_ids.indexOf(id);
            if (idx > -1) {
                $scope.requestData.topic_ids.splice(idx, 1);
            }
        }
        if(filterType=='locatonFilter'){
            var idx =  $scope.requestData.location_ids.indexOf(id);
            if (idx > -1) {
                $scope.requestData.location_ids.splice(idx, 1);
            }
        }
        if(filterType=='startDateFilter'){
           $scope.requestData.startDate=null
        }

        if(filterType=='endDateFilter'){
           $scope.requestData.endDate=null
        }

        if(filterType=='timeFilter'){
            var idx =  $scope.requestData.time_slot.indexOf(id);
            if (idx > -1) {
                $scope.requestData.time_slot.splice(idx, 1);
            }
        }
        $scope.doSearch();
    }


});

