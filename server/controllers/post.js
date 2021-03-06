/**
    설  명 : post controller
    개발일 : 2015-09-10
    개발자 : ABC
*/
var model = reqlib("/server/models/dao/post.js");
module.exports = {
    index: {
        method: "GET",
        path: "/post",
        handler: function (request, reply) {
            reply.view("post/post", {
                title : "페이지"
            });
        }
    },
    // 카테고리별 리스트
    posts: {
        method: "GET",
        path: "/post/{category}/{page}/{pageSize?}",
        handler: function (req, reply) {
            // 페이지 변수 설정
            if(!req.params.pageSize){
                req.params.pageSize = 5;
            }
            req.params.page = isNaN(req.params.page) ? 0 : (req.params.page - 1) * req.params.pageSize;

            model.GetPostCategoryList(req, function (data) {
                reply(data);
            });
        }
    },
    // 게시글 상세
    post : {
        method : "GET",
        path : "/post/{Idx}",
        handler: function (req, reply){
            model.GetPost(req, function(data){
                reply(data);
            });
        }
    }
}