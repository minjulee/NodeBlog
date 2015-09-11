/**
    설  명 : MySQL module
    개발일 : 2015-09-10
    개발자 : ABC

    변경일 : 2015-09-11
    변경자 : 이민주
    설  명 : Xml에서 idx = {0.idx} 와 같은 형식으로 조건문을 만들고
             string-format 모듈을 이용해서 idx = {0.idx} => idx = 1 과 같이 바꾼다.
    참  고 : https://www.npmjs.com/package/string-format
*/
// import noe_modules
var mysql = require("mysql");
var fs = require("fs");
var xmlParser = require("xml2js").parseString;
var path = require("path");
var strFormat = require("string-format");

// connect mysql
var connection = mysql.createConnection(settings.dbConfig);
connection.connect(function(err){
    if(err){
        console.error("mysql connection error");
        console.error(err);
        throw err;
    }
});

exports.GetSelectBySql = function(strSql, callback){
    connection.query(strSql, function(err, rows){
        callback(rows);
    });
}

// get a query from xml and select query
// request object, xml fileName, queryId, callback function
exports.GetSelectByXml = function(req, fileName, queryId, callback){
    // create filePath
    var filePath = path.join(__dirname, "../models/xml/", fileName);
    // read xml file
    fs.readFile(filePath, function(err, xml){
        // parsing xml file
        xmlParser(xml, function(err_f, result){
            // loop query set
            for(var i = 0; i < result.root.query.length; i++){
                // if queryId matching
                if(result.root.query[i].$.id === queryId){
                    var query = result.root.query[i]._;
                    // query convert
                    query = strFormat(query, req.params);
                    // return select query
                    connection.query(query, function(err, rows){
                        callback(rows);
                    });
                    break;
                }
            }
        });
    });
}