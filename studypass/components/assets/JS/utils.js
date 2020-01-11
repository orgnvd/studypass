angular.module('studypass.utils', ['ngRoute'])
    .service('utilityService', function ($rootScope, localStorageService, $http, $q) {
        var canceler = $q.defer();


        /*todo @ekhan cleanup and sync promise*/
        /*var spinnerQueueSize = 0;
        this.showSpinner = function () {
            spinnerQueueSize += 1;
            $rootScope.showSpinner = spinnerQueueSize > 0;
        };

        this.hideSpinner = function () {
            spinnerQueueSize -= 1;
            $rootScope.showSpinner = spinnerQueueSize > 0;
        }

        this.postHTTP = function (url, data, showSpinner, customHeader) {
            debugger

            if (showSpinner === undefined || showSpinner) {
                this.showSpinner();
            }
            var token = localStorageService.get('x-auth-token');
            var req = {
                method: 'POST',
                url: url,
                headers: {
                    'x-auth-token': token
                },
                data: data,
                timeout: canceler.promise
            };
            if (customHeader) {
                req.headers[customHeader.name] = customHeader.value
            }
            var url1 = url;
            return $http(req);
        };*/

        this.getHTTP = function (url, data) {
            var token = localStorageService.get('auth-token')
            var req = {
                method: 'GET',
                url: url,
                headers: {
                    'Authorization': token
                },
                params: data,
                timeout: canceler.promise
            };

            return $http(req)
        };

        this.postHTTP = function (url, data) {
            var token = localStorageService.get('auth-token')
            var req = {
                method: 'POST',
                url: url,
                headers: {
                    'Authorization': token
                },
                data: data,
                timeout: canceler.promise
            };
            return $http(req)
        };
    })