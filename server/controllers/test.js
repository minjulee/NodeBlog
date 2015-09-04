var model = reqlib("/server/config/mysql.js");
module.exports = {
    index: {
        handler : function(request, reply){
            var test = require("../model/test.ts");
            model.GetSelect("select username, email, date_format(create_time, '%Y-%m-%d') create_time from user", function(recordset){
                // 유저 리스트 클래스 초기화
                var users = new test.Users();

                for(var prop in recordset){
                    if(typeof recordset[prop] === "object"){
                        var user = new test.User();
                        for(var propName in recordset[prop]){
                            user[propName] = recordset[prop][propName];
                        }

                        users[prop] = user;
                    }else{

                    }
                }
                reply.view("test/index", {
                    title : "Email-Inbox",
                    data : recordset
                });
            });
        },
        id : "index"
    }
}