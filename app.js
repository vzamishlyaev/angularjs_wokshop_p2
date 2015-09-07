'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'myApp.post',
    'myApp.comment'
])
    .config(['$httpProvider',function($httpProvider) {
        function requestTransformer(value) {
            console.log('%c ' + 'default request tranformer',
                'background: #22b; color: #bada55');
            return value;
        }

        function responseTransformer(value) {
            console.log('%c ' + 'default response tranformer',
                'background: #22b; color: #bada55');
            return value;
        }


        $httpProvider.interceptors.push('applicationInterceptor');
        $httpProvider.interceptors.push('secondInterceptor');
        $httpProvider.interceptors.push('thirdInterceptor');

        $httpProvider.defaults.transformRequest.push(requestTransformer);
        $httpProvider.defaults.transformResponse.push(responseTransformer);
    }])
    .factory('applicationInterceptor',['$q',function($q) {
        return {
            request: function(request) {
                console.log('%c ' + request.status+' intercepted request',
                    'background: #222; color: #bada55');
                return $q.reject(request);
                //return request;
            },
            requestError: function(request) {
                console.log('%c ' + request+' intercepted request error, appInter',
                    'background: #e22; color: #bada55');
                return request;
            },
            response: function(response){
                console.log('%c ' + response.status+' intercepted response',
                    'background: #222; color: #bada55');
                return response;
            },
            responseError: function(response) {
                console.log('%c ' + response+' intercepted response error',
                    'background: #e22; color: #bada55');
                return response;
            }
        };
    }])
    .factory('secondInterceptor',['$q',function($q) {
        return {
            requestError: function(request) {
                console.log('%c ' + request+' intercepted request error, secondInter',
                    'background: #e22; color: #bada55');
                return $q.reject(request);
                //return request;
            }
        };
    }])
    .factory('thirdInterceptor',['$q',function($q) {
        return {
            requestError: function(request) {
                console.log('%c ' + request+' intercepted request error, thirdInter',
                    'background: #e22; color: #bada55');
                return request;
            }
        };
    }]);