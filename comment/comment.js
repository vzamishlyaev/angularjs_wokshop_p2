'use strict';

angular.module('myApp.comment', ['ngRoute'])

.directive('comment', [function() {
    return {
        restriction: 'E',
        replace: true,
        scope: {
            model: '='
        },
        templateUrl: 'comment/comment.html'
    };

}]);