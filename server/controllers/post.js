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
    posts: {
        method: "GET",
        path: "/post/{category}/{Idx?}",
        handler: function (request, reply) {
            model.GetPostList(request, function (data) {
                reply(data);
            });
        }
    }
}