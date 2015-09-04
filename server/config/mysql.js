/**
 * Created by ABC on 2015-09-03.
 */
var mysql = require("mysql");
var connection = mysql.createConnection(settings.dbConfig);
connection.connect(function(err){
    if(err){
        console.error("mysql connection error");
        console.error(err);
        throw err;
    }
});

exports.GetSelect = function(strSql, callback){
    connection.query(strSql, function(err, rows){
        callback(rows);
    });
}