search.service('searchService', function ($rootScope,ConfigurationHolder,utilityService) {

    this.fetchSearchResults=function (requestObj) {
        return utilityService.postHTTP(ConfigurationHolder.serverAppUrl + "/fetch_search_results", requestObj)
    }

    this.prepareSearchQuery=function(requestData){
        _query={"selected_filters":{}};

        /*add institute_Id*/
        if(requestData.institute_id){
            _query.selected_filters.institute_id=requestData.institute_id
        }
        /*location*/
        if(requestData.locationId){
            _query.selected_filters.city_id=requestData.locationId
        }

        /*sub location_ids*/
        if(requestData.location_ids){
            _query.selected_filters.location_ids=requestData.location_ids
        }

        /*topic*/
        if(requestData.topicId){
            _query.selected_filters.subject_id=requestData.topicId
        }

        /*sub topic ids*/
        if(requestData.topic_ids){
            _query.selected_filters.topic_ids=requestData.topic_ids
        }

        /*exams*/
        if(requestData.exams){
            _query.selected_filters.exams = requestData.exams
        }

        /*start date*/
        if(requestData.startDate){
            _query.selected_filters.start_date = requestData.startDate
        }

        /*end date*/
        if(requestData.endDate){
            _query.selected_filters.end_date = requestData.endDate
        }

        /*time slot*/
        if(requestData.time_slot){
            _query.selected_filters.time_slot=requestData.time_slot
        }

        return _query
    }

    this.prepareSearchPageDisplayData=function(responseData){
        _responseData=[]
        if(responseData.results){
            Object.keys(responseData.results).forEach(function(id) {
                var instituteDetails=responseData.results[id]
                var finalDetails={}
                finalDetails.institute_id=instituteDetails.institute_id
                finalDetails.institute_contact=instituteDetails.institute_contact
                finalDetails.institute_image=instituteDetails.institute_image
                finalDetails.institute_name=instituteDetails.institute_name
                finalDetails.topic_name=instituteDetails.topic_name
                var uniqueExamsSet=new Set([]);
                var uniqueTimings= new Set([]);
                var uniqueDates= new Set([]);

                instituteDetails.lectures && instituteDetails.lectures.forEach(function (lecture) {
                        if(lecture.exams){
                            lecture.exams.forEach(function (exam) { uniqueExamsSet.add(exam)});
                        }
                        if(lecture.lecture_slot_time){
                            uniqueTimings.add(lecture.lecture_slot_time)
                        }
                        if(lecture.lecture_date){
                            uniqueDates.add(lecture.lecture_date)
                        }
                })
                finalDetails.exams=Array.from(uniqueExamsSet);
                finalDetails.timings=Array.from(uniqueTimings);
                finalDetails.dates=Array.from(uniqueDates);
                _responseData.push(finalDetails)
            });
        }
        return _responseData
    }

    this.prepareAllFiltersData=function (responseData) {
        _all_filters=responseData.all_filters
        _all_filters.exams=responseData.exams
        _all_filters.time_slot=responseData.time_slot
        return _all_filters;
    }
    this.prepareSelectedFilterData =function (responseData) {
        return responseData.selected_filters;
    }
});
