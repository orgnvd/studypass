var institute = angular.module('studypass.institute', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/institute/:instituteId', {
            templateUrl: 'components/institute/views/instituteDetails.html',
            controller: 'instituteController'
        });
    }]);

institute.controller('instituteController', function ($rootScope, $scope,$routeParams,$location,$modal,searchService,homeService,instituteService) {

    $scope.instituteDisplayData = {}
    $scope.fetchInstituteData = function () {
        var promise = instituteService.fetchInstiteDetails({id:$routeParams.instituteId})
        promise.then(function onSuccess(response) {
            if (response.status == 200) {
                $scope.instituteDisplayData = response.data.institute_details
                $scope.instituteDisplayData.instituteDetailsFlow = true
                $scope.applyDefaultFilters()
                $scope.searchResults();
            } else {
                console.log("error")
            }
        }).catch(function onError(response) {
            console.log("error")
        });
    }


    $scope.openSlotDetails = function(schedule,lecture){
        $scope.schedule=schedule
        $scope.lecture=lecture
        var modalInstance = $modal.open({
            templateUrl: 'components/institute/views/lectureDetailsModal.html',
            controller: 'slotDetails',
            scope : $scope,
            size: 'sm',
            resolve:{}
        });
    }


    $scope.applyDefaultFilters=function(){
        if(!$scope.requestData){
            $scope.requestData={}
        }
        $scope.requestData.institute_id=$routeParams.instituteId

    }




    /*todo ekhan : move institute and searchPage commonlogic to commonCtrl*/

    function initSearchFilters() {
        $scope.requestData=instituteService.getAppliedFilters();
        if(!$scope.requestData){
            $scope.requestData={}
            $scope.requestData.topic_ids=[]
            $scope.requestData.startDate=null
            $scope.requestData.endDate=null
            $scope.requestData.location_ids=[]
            $scope.requestData.exams=[]
            $scope.requestData.time_slot=[]
        }
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
        }
        $scope.requestData.location_ids=[]
        $scope.requestData.locationId=city_id

        $scope.doSearch();
    }


    $scope.fetchSearchPageData=function () {

        var requestObj =searchService.prepareSearchQuery($scope.requestData)
        console.log("search query:")
        console.log(requestObj);
        var promise = searchService.fetchSearchResults(requestObj)
        promise.then(function onSuccess(response) {
            if (response.status == 200) {
                $scope.instituteData = instituteService.prepareInstitureScheduleDisplayData(response.data)
                $scope.all_filters=searchService.prepareAllFiltersData(response.data)
                $scope.selected_filters=searchService.prepareSelectedFilterData(response.data)
            } else {
                console.log("error")
            }
        }).catch(function onError(response) {
            console.log("error")
        });
    }

    $scope.searchResults=function () {
        homeService.setSearchFilters($scope.requestData)
        $scope.fetchSearchPageData();
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



}).controller('slotDetails', function($scope,$location,$modalInstance) {
    $scope.cancel = function () {
        $modalInstance.close();
    }
    $scope.ok = function () {
        $modalInstance.close();
    }
});

