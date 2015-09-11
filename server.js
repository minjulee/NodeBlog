global.reqlib = require("app-root-path").require;
global.settings = reqlib("/server/config/setting");
global.multiline = require("multiline");

var Hapi = require("hapi");
var Path = require("path");

// 서버 포트 커넥션 설정
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

server.ext('onPreResponse', function (request, reply) {

    if (request.response.isBoom) {
        var err = request.response;
        var errName = err.output.payload.error;
        var statusCode = err.output.payload.statusCode;
        var errText = statusCode === 404
            ? "Sorry, but the page you were trying to view does not exist."
            : "Sorry, I will thank you If you're telling an error!!";
        return reply.view('error', {
            statusCode: statusCode,
            errName: errName,
            errText: errText
        })
        .code(statusCode);
    }
    reply.continue();
});

server.start(function(){
    console.log("Server started at : "  + server.info.uri);
});