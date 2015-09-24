/**
    설  명 : post model
    개발일 : 2015-09-10
    개발자 : ABC
*/
var normalPath = "public/src/";
var distPath = "public/dist/";
module.exports = {
    img: {
        handler: { directory: { path: normalPath + "img" } },
        id: 'img'
    },
    css: {
        handler: { directory: { path: distPath + "css" } },
        id: 'css'
    },
    js: {
        handler: { directory: { path: distPath +  "js" } },
        id: 'js'
    },
    angular :{
        handler: { directory: { path: "server/models/" + "angular" } },
        id: "angular"
    },
    plugin :{
        handler : {directory: {path : normalPath + "plugin"} },
        id : "plugin"
    },
    fonts: {
        handler: { directory: { path: normalPath + "fonts" } },
        id: 'fonts'
    }
}