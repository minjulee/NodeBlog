global.reqlib = require("app-root-path").require;
global.settings = reqlib("/server/config/setting");

var Hapi = require("hapi");
var Path = require("path");

// ���� ��Ʈ Ŀ�ؼ� ����
var server = new Hapi.Server();
server.connection({
    host: settings.host,
    port: settings.port
});

module.exports = server;
reqlib("/server/config/plugin");

// usernames which are currently connected to the chat
var usernames = {};
var numUsers = 0;

var socketIO = require("socket.io");
var io = socketIO.listen(server.listener);
io.sockets.on("connection", function(socket){
    var addedUser = false;

    socket.on("new message", function(data){
        socket.broadcast.emit("new message", {
            username : socket.username,
            message: data
        });
        console.log(socket.username + " : " + data);
    });

    socket.on("add user", function(username){
        socket.username = username;
        usernames[username] = username;
        ++numUsers;
        addedUser = true;
        socket.emit("login", {
            numUsers: numUsers
        });

        socket.broadcast.emit("user joined", {
            username: socket.username,
            numUsers : numUsers
        });
    });

    socket.on("typing", function(){
        socket.broadcast.emit("typing", {
            username: socket.username
        });
    });

    socket.on("stop typing", function(){
        socket.broadcast.emit("stop typing", {
            username: socket.username
        });
    });

    socket.on("disconnect", function(){
        if(addedUser){
            delete usernames[socket.username];
            --numUsers;

            socket.broadcast.emit("user left", {
                username: socket.username,
                numUsers: numUsers
            });
        }
    });
});

server.route(reqlib("/server/config/route"));

server.start(function(){
    console.log("Server started at : "  + server.info.uri);
});