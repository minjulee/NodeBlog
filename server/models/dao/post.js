/**
    ��  �� : post model
    ������ : 2015-09-10
    ������ : ABC
*/
var model = reqlib("/server/config/mysql.js");
exports.GetPostList = function(req, callback){
    model.GetSelect("post.xml", "postList", function(data){
        callback(data);
    });
}