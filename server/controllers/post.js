/**
    ��  �� : post controller
    ������ : 2015-09-10
    ������ : ABC
*/
var model = reqlib("/server/models/dao/post.js");
module.exports = {
    posts: {
        method: "GET",
        path: "/post/{path*}",
        handler: function (request, reply) {
            model.GetPostList(request, function (data) {
                reply(data);
            });
        }
    }
}