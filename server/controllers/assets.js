/**
 * Created by ABC on 2015-08-28.
 */
/*
    이미지, 스크립트, 스타일 파일 등
 */
var path = "public/src/";
module.exports = {
    img: {
        handler: { directory: { path: path + "img" } },
        id: 'img'
    },
    css: {
        handler: { directory: { path: path + "css" } },
        id: 'css'
    },
    js: {
        handler: { directory: { path: path +  "js" } },
        id: 'js'
    },
    fonts: {
        handler: { directory: { path: path + "fonts" } },
        id: 'fonts'
    }
}