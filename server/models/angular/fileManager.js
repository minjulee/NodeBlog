/**
    설  명 : ...
    개발일: 2015-09-11
    개발자 : ABC
 */
var app = angular.module("FileManagerApp", ["ngSanitize"]);

app.controller("FileManagerController", function($scope, $http){

    $scope.init = function(category, idx){
        $scope.category = category;
        $scope.idx = idx;
    };

    $http.get("/fileManager/dirInfo").success(function(data){
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
