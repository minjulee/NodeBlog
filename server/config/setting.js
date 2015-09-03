/**
 * Created by ABC on 2015-08-28.
 */
module.exports = {
    port: parseInt(process.env.PORT, 10) || 3000,
    host: "localhost",
    asset:{
        development:{
            ie9Js:[
                "js/vendor/html5shiv.min.js"
            ],
            topJs:[
                "js/vendor/modernizr.custom.32229-2.8-respondjs-1-4-2.js"
            ],
            bottomJs:[
                "js/vendor/jquery-1.11.2.min.js",
                "js/vendor/bootstrap.min.js",
                "js/vendor/fastclick.min.js",
                "js/vendor/jquery.jpanelmenu.min.js",
                "js/vendor/retina.min.js",
                "js/main.js"
            ],
            css:[
                "css/bootstrap/bootstrap.min.css",
                "css/bootstrap/font-awesome.min.css",
                "css/main.css"
            ]
        },
        production:{
            js:["js/main.js"],
            css:["css/main.css"]
        }
    },
    dbConfig : {
        host : "100minser.cloudapp.net",
        port: "3306",
        user: "minama",
        password:"L!M@J#192458",
        database: "blog"
    }
};