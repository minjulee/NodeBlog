/**
    설  명 : ...
    개발일: 2015-09-11
    개발자 : ABC
 */
var app = angular.module("PostApp", ["ngSanitize"]);

app.controller("PostController", function($scope, $http){
    $http.get("/post/개발/1").success(function(data){
        $scope.posts = data;
        console.log(data);
    }).error(function(data){
        console.log("Error: " + data);
    });
});

app.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('[[');
  $interpolateProvider.endSymbol(']]');
});
