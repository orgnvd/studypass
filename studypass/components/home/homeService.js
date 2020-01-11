
homeModule.service('homeService', function ($rootScope,ConfigurationHolder,utilityService) {

    this.searchFilters={}
    this.getLocationsAndTopics = function(){
        return utilityService.getHTTP(ConfigurationHolder.serverAppUrl + '/get_locations_and_topics');
    };

    this.getHomePageBlogData =function () {
        return utilityService.getHTTP(ConfigurationHolder.serverAppUrl + '/blogs/home_page_blogs');
    }
    this.setSearchFilters=function (searchFilters) {
        this.searchFilters=searchFilters
    }
    this.getSearchFilters =function () {
        return this.searchFilters;
    }
});
