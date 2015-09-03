var model = reqlib("/server/config/mysql.js");
module.exports = {
    index: {
        handler : function(request, reply){
            model.GetSelect("select username, email, date_format(create_time, '%Y-%m-%d') create_time from user", function(recordset){
                reply.view("test/index", {
                    title : "Email-Inbox",
                    data : recordset
                });
            });
        },
        id : "index"
    }
}