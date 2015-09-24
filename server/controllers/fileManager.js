/**
 설  명 : ....
 개발일 : 2015-09-16
 개발자 : ABC
 */
module.exports = {
    test: {
        method: "GET",
        path: "/fileManager/test",
        handler: function (request, reply) {
            reply.view("plugin/fileManager", {
                title : "Image Manager"
            });
        }
    },
    dirInfo : {
        method: "GET",
        path : "/fileManager/dirInfo/{allDepth}/{fileFilter?}",
        handler : function(request, reply){
            var option = {
                "filePath" : "public/src/img/upload",
                "inDir" : true,
                "inFile" : true,
                "allDepth" : true,
                "root" : "폴더 선택"
            };

            if(request.params.fileFilter){
                var fileFilter = encodeURIComponent(request.params.fileFilter);
                if(fileFilter === "dir"){
                    option.inDir = true;
                    option.inFile = false;
                }else if(fileFilter === "file"){
                    option.inDir = false;
                    option.inFile = true;
                }
            }

            if(request.params.allDepth === "sel"){
                option.allDepth = false;
            }

            var directoryInfo = new directoryTree(option);
            directoryInfo.GetAllFilesToJson(function(data){
                reply(data);
            });
        }
    }
}

var fs   = require("fs"),
    path = require("path");
var directoryTree = function(option){
    var inDir =  option.inDir;
    var inFile = option.inFile;
    var allDepth = option.allDepth;

    // 객체 클래스 화
    var Obj = function(pPath){
        this.id = "root";
        this.path = pPath;
        this.text = pPath;
        this.type = "root";
        this.children = [];
    };
    // 반환 객체 생성
    var retObj = new Obj(option.filePath);
    // 내부 함수를 사용하기 위한 프로퍼티성 함수
    this.GetAllFilesToJson = function(pCb){

        var FncAllFilesToJson = function(pObj){
            // 받아온 객체의 경로를 읽어 경로 하위(바로 아래만)의 파일(디렉토리 포함) 반환
            var files = fs.readdirSync(pObj.path);
            // 파일 존재시
            if(files.length > 0){
                files.forEach(function(file) {
                    // 해당 파일을 Obj 객체로 초기화
                    var info = new Obj(path.resolve(pObj.path, file));
                    info.text = file;
                    // ID 생성
                    info.id = info.path.replace("d:\\01_Project\\NodeBlog\\NodeBlog\\", "").replace(/\\/gi, "_");
                    // 파일의 정보를 얻어옴
                    var stat = fs.statSync(info.path);
                    // 디렉토리라면 현재 함수 다시 호출(재귀)
                    if(stat.isDirectory()) {
                        // 해당 객체의 자식요소 배열에 삽입
                        if(inDir){
                            info.type = "dir";
                            pObj.children.push(info);
                        }
                        if(allDepth) FncAllFilesToJson(info);
                    }else{
                        if(inFile){
                            info.type = "file";
                            pObj.children.push(info);
                        }
                    }
                });
            }
        }
        // 디렉토리 구조 Json 형식으로 변환
        FncAllFilesToJson(retObj);
        pCb(retObj);
    };
}