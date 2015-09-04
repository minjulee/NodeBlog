var model = reqlib("/server/config/mysql.js");
module.exports = {
    index: {
        handler : function(request, reply){

            var helper = require("../config/dataHelper.ts");
            var test = require("../model/test.ts");

            model.GetSelect("select username, email, date_format(create_time, '%Y-%m-%d') create_time from user", function(recordset){

                var instance = helper.deserialize(recordset, test.Environment, test.Environment.user);
                //console.log(instance);

                reply.view("test/index", {
                    title : "Email-Inbox",
                    data : recordset
                });
            });
        },
        id : "index"
    }
}