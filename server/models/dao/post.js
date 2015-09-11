/**
    설  명 : post model
    개발일 : 2015-09-10
    개발자 : ABC
*/
var model = reqlib("/server/config/mysql.js");
exports.GetPostList = function(req, callback){
    model.GetSelectByXml(req, "post.xml", "postList", function(data){
        callback(data);
    });
}