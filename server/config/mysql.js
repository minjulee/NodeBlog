/**
    설  명 : MySQL module
    개발일 : 2015-09-10
    개발자 : ABC
*/
// import noe_modules
var mysql = require("mysql");
var fs = require("fs");
var xmlParser = require("xml2js").parseString;
var path = require("path");

// connect mysql
var connection = mysql.createConnection(settings.dbConfig);
connection.connect(function(err){
    if(err){
        console.error("mysql connection error");
        console.error(err);
        throw err;
    }
});

// get a query from xml and select query
// xml fileName, queryId, callback function
exports.GetSelect = function(fileName, queryId, callback){
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
                    // return select query
                    connection.query(query, function(err, rows){
                        callback(rows);
                    });
                }
            }
        });
    });
}