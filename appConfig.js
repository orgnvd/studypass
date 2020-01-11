angular.module('appConfig', []).constant('appConfig',configurations).factory('ConfigurationHolder',function(appConfig){
    return appConfig;
});