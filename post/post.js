'use strict';

angular.module('myApp.post', ['ngRoute', 'ngResource'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/post/:id', {
            templateUrl: 'post/post.html',
            controller: 'PostCtrl',
            resolve: {
                post: ['$route', 'PostService', function($route, PostService) {
                    return PostService.Post.get({id:$route.current.params.id}, function() {
                        console.log(arguments);
                    });
                }]/*,
                comments: ['$route', 'PostService', function($route, PostService) {
                    return PostService.Comment.query({postId:$route.current.params.id});
                }]*/
            }
        });

    }])

    .service('PostService', ['$resource', '$http', function($resource, $http) {

        function appendTransform(defaults, transform) {
            defaults = angular.isArray(defaults) ? defaults : [defaults];
            return defaults.concat(transform);
        }

        var post = new Post({id:13});
        post.$get();
        post.name = 321;
        post.$save();

        Post.get({id:123, sortBy:'name'});

        http://localhost:3000/posts/123?sortBy=name
        return {
            Post: $resource('http://localhost:3000/posts/:id', {id:'@id'}, {
                    get: {param: {id: '@id'}},
                    post: {param: {id: '@myId'}}
                }
            ),
        get, update, delet
            Comment: $resource('http://localhost:3000/comments')

        {
            get: $http({method:'get',fudfkfkdskf})
        }
        };
    }])

    .controller('PostCtrl', [
        '$scope',
        'PostService',
        '$routeParams',
        'post',
        //'comments',
        '$http',
        function($scope, PostService, $routeParams, post/*, comments*/) {
            $scope.post = post;
            //$scope.comments = comments;
            $scope.newComment = {};

            $scope.saveComment = function(form) {
                var newComment = $scope.newComment;
                newComment.postId = post.id;
                new PostService.Comment(newComment).$save(function(result) {
                    $scope.newComment = {};
                    form.$setPristine();
                    comments.push(result);
                });
            };
        }
    ]);