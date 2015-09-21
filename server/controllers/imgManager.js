/**
 설  명 : ....
 개발일 : 2015-09-16
 개발자 : ABC
 */
module.exports = {
    index: {
        method: "GET",
        path: "/post",
        handler: function (request, reply) {
            reply.view("plugin/imageManager", {
                title : "Image Manager"
            });
        }
    },
    dirInfo : {
        method: "GET",
        path : "/imgManager/dirInfo",
        handler : function(request, reply){
            //var root = [];
            //GetDirInfo("public/src/img", root, function(err, dirInfo){
            //    console.log(dirInfo);
            //    //reply.send(dirInfo);
            //});

            //forAllFiles("public/src/img",
            //    function(file, next){
            //        console.log(file); next();
            //    },
            //    function(err){
            //        console.log("done : " + err);
            //    }
            //)
            var fileInfo = new FileInfo("server");
            GetAllFilesToJson("server", fileInfo,
                function(err, file, next){

                },
                function(err){

                }
            );
        }
    }
}

var fs   = require("fs")
  , path  = require("path");

var FileInfo = function(path){
    this.path = path;
    this.name = "";
    this.level = 0;
    this.id = 1;
    this.topId = 0;
};

var directoryTree = function(path){
    var retObj = {
        "path" : "root",
        "name" : "",
        "child" : []
    }
}

function GetAllFilesToJson(pPath, pObj, pFileCb, pDoneCb){
    fs.readdir(pObj.path, function processDir(err, files){
        if(err){
            pDoneCb(err);
        }else{
            if(files.length > 0){

                files.forEach(function(file) {
                    var info = new FileInfo();
                    info.name = file;
                    info.path = path.resolve(pPath, file);

                    fs.stat(info.path, function ProcessStat(err, stat){
                        if(stat.isDirectory()){
                            pObj.dirs.push(info);
                            GetAllFilesToJson(info.path, info, pFileCb, pDoneCb);

                            console.log(pObj);
                            console.log("-------------------------------------------------");
                        }
                    });
                });
            }
        }
    });
}

function forAllFiles(root, fileCb, doneCb) {
    fs.readdir(root, function processDir(err, files) {
        if (err) {
            fileCb(err);
        } else {
            if (files.length > 0) {
                var file = root + '/' + files.shift();
                fs.stat(file, function processStat(err, stat) {
                    if (err) {
                        doneCb(err);
                    } else {
                        if (stat.isFile()) {
                            fileCb(file, function(err) {
                                if (err) {
                                    doneCb(err);
                                } else {
                                    processDir(false, files);
                                }
                            });
                        } else {
                            console.log("directory : " + file);
                            forAllFiles(file, fileCb, function(err) {
                                if (err) {
                                    doneCb(err);
                                } else {
                                    processDir(false, files);
                                }
                            });
                        }
                    }
                });
            } else {
                doneCb(false);
            }
        }
    });
}

var GetDirInfo = function (dirName, obj, cb){

    var folderList = [];
    fs.readdir(dirName, function(err, list){
        if(err) cb(err, null);
        if(list.length === 0) cb(null, null);

        var index = 0;
        list.forEach(function(file){
            file = path.resolve(dirName, file);

            fs.stat(file, function(err, stats){
                if(stats.isDirectory()){
                    obj.push(list[index]);
                }
                if(index + 1 === list.length){
                    cb(null, folderList);
                }
                index++;
            });
        });
    });
}