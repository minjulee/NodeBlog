/**
    설  명 :
    개발일: 2015-09-11
    개발자 : ABC
 */
var app = angular.module("PostApp", ["ngSanitize"]);

// 전체 게시글, 해당 카테고리 게시글, 게시글 상세
app.controller("PostController", function($scope, $http){
    // 기본 url은 최신 게시글 5
    var url = "/post/all/1/5";
    // url 초기화
    $scope.init = function(pUrl){
        if(pUrl){
            url = pUrl;
        }
    }
    // 해당 API 주소를 호출하여 데이터 획득
    $http.get(url).success(function(data){
        $scope.posts = data;
        console.log(data);
    }).error(function(data){
        console.log("Error: " + data);
    });
});

// Angular.js 기본 변수 제공자 변경(hapi.js 와 겹침)
app.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('[[');
  $interpolateProvider.endSymbol(']]');
});
