//var model = reqlib("/server/model/index.js");
module.exports = {
    index: {
        handler : function(request, reply){
            reply.view("test/index", {
                title : "Email-Inbox"
            });
        },
        id : "index"
    }
    //,
    //send : {
    //    handler : function(request, reply){
    //        model.GetRecordSet("select * from GW_EMAIL", function (recordset) {
    //            reply.view("email/index", {title : process.env.NODE_ENV, data : recordset});
    //        });
    //    },
    //    id : "send"
    //},
    //missing : {
    //    handler : function(request, reply){
    //        reply.view("404", {
    //            title : "Total Bummer 404 Page"
    //        }).code(404);
    //    },
    //    id : "404"
    //}
}