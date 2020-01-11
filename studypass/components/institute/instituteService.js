institute.service('instituteService', function ($rootScope,ConfigurationHolder,utilityService) {

    this.fetchInstiteDetails=function (requestObj) {
        return utilityService.getHTTP(ConfigurationHolder.serverAppUrl + "/fetch_institute_details", requestObj)
    }


    this.appliedFilters;

    this.setAppliedFilters=function (appliedFilters) {
        this.appliedFilters=appliedFilters
    }
    this.getAppliedFilters =function () {
        return this.appliedFilters;
    }

    this.prepareInstitureScheduleDisplayData=function(responseData){
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
                finalDetails.lectures=instituteDetails.lectures
                var uniqueExamsSet= new Set([]);
                instituteDetails.lectures && instituteDetails.lectures.forEach(function (lecture) {
                    if(lecture.exams){
                        lecture.exams.forEach(function (exam) { uniqueExamsSet.add(exam)});
                    }
                })
                finalDetails.exams=Array.from(uniqueExamsSet);

                _responseData.push(finalDetails)
            });
        }
        return _responseData
    }

});
